//import * as storage from '@google-cloud/storage';

const functions = require('firebase-functions');
const {Storage} = require('@google-cloud/storage');
const path = require('path');
const os = require('os');
const fs = require('fs');
var gs = require('gs');


const gcs = new Storage({
  projectId: "invoice-processing-webapp",
});
console.log('Starting Function');
exports.makePNG = functions.storage.object().onFinalize((object) => {
  const filePath = object.name;
  const fileName = path.basename(filePath);
  const tempFilePath = path.join(os.tmpdir(), fileName);
 // const tempFilePath = path.join('temp', fileName);
  //if (fileName.endsWith('.png')) return false;
  //if (!fileName.endsWith('.pdf')) return false;
  console.log('Setting Variables');

  const newName = path.basename(filePath, '.pdf') + 'converted.png';
  const tempNewPath = path.join(os.tmpdir(), newName);
  console.log('FilePath ' + filePath);
  console.log('newName ' + newName);

  const bucket = gcs.bucket(object.bucket);

  // Download file from bucket.
  return bucket.file(filePath).download({
    destination: tempFilePath
  }).then(() => {
    console.log('Image downloaded locally to', tempFilePath);

    return new Promise(((resolve, reject) => {
      gs()
        .batch()
        .nopause()
        .option('-r' + 100 * 2)
        .option('-dDownScaleFactor=1')
        .executablePath('lambda-ghostscript/bin/./gs')
        .device('png16m') 
        .output(tempNewPath)
        .input(tempFilePath)
        .exec((err, stdout, stderr) => {
          if (!err) {
            console.log('gs executed w/o error');
            console.log('stdout', stdout);
            console.log('stderr', stderr);
            resolve();
          } else {
            console.log('gs error:', err);
            reject(err);
          }
        });
    }));
  }).then(() => {
    console.log('PNG created at', tempNewPath);
    console.log('The destination will be  temp/'+newName);
    return bucket.upload(tempNewPath, {destination: 'temp/'+newName});
  // Once the thumbnail has been uploaded delete the local file to free up disk space.
  }).then(() => {
    fs.unlinkSync(tempNewPath);
    fs.unlinkSync(tempFilePath);
    return null;
  }).catch((err) => {
    console.log('exception:', err);
    return err;
  });

});