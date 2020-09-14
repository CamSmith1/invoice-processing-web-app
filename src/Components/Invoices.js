import React,{useState,useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';

import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

import '@firebase/firestore';
import {storage} from "./Firestore";
import firebase from '@firebase/app';



const useStyles = makeStyles((theme) => ({
    container : {
        display : 'flex',
        justifyContent : 'center',
        height : '87vh'
    },
    optionsContainer : {
        display : 'flex',
        flexDirection : 'column',
        alignItems : 'center',
        justifyContent : 'space-around'
    },
    listContainer : {
        margin : '40px 0 30px 40px',
        width : '400px',
        border : '1px solid grey'
    },

  select:{
      width: 150,
  },
  button :{
    width: 150,
  },
  input: {
    display: 'none',
  },
}))



const Invoices = () => {

 
 let templateSelected = false;
  const classes = useStyles();
  const [template, setTemplate] = useState('');
  const [integration, setIntegration] = useState('');
  const [openTempSelect, setOpenTempSelect] = useState(false);
  const [openIntSelect , setOpenIntSelect] = useState(false);
  const [files , setFiles] = useState([]);
  const listOfTemplates = []; // List to be used for select template dropdown
  const [templateList , setTemplateList] =  useState([]);



  /********************Utility Functions******************************** */
  const handleTemplateChange = (event) => {
    setTemplate(event.target.value);
    templateSelected = true;

  };
  const initData = () => {
    retrieveTemplatesList();
  };
  
  const handleIntegrationChange = (event) => {
    setIntegration(event.target.value);
  };
  const handleFileUpload = (event) => {
    const arr = files.concat(Object.values(event.target.files));
    setFiles(arr)
    console.log(arr)
}
  const handleTempSelectClose = () => {
    setOpenTempSelect(false);
  };

  const handleTempSelectOpen = () => {

    
    setOpenTempSelect(true);
  };
  const handleIntSelectClose = () => {
    setOpenIntSelect(false);
  };

  const handleIntSelectOpen = () => {
    setOpenIntSelect(true);
  };

  const handleSubmit = () => {
   //TODO: Logic to upload all files to the OCR folder in firebase, create a temp folder with a unique name
   //Second part is to execute a cloud function to loop over all files in the new folder and perform OCR based on the template
   //Then delete the temp folder and display the data 

   if(templateSelected === true){

    //Use the files variable and upload to a bucket
   let transactionID = generateTransactionID(30); //Unique ID for the folder in firestore
   let baseDirectory = 'OCR/';
   let destinationDirectory = baseDirectory + transactionID;
   onUploadSubmission(destinationDirectory);

   //TODO: Write a cloud function that loops over all files in the destination directory and performs OCR using the selected template
     
   }


  };


  //Uploads all the files selected to firebase under the temp directory
  const onUploadSubmission = (dir) => {
   // e.preventDefault(); // prevent page refreshing
      const promises = [];
      files.forEach(file => {
       const uploadTask = 
        firebase.storage().ref().child(`${dir}/${file.name}`).put(file);
          promises.push(uploadTask);
          uploadTask.on(
             firebase.storage.TaskEvent.STATE_CHANGED,
             snapshot => {
              const progress =  (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                 if (snapshot.state === firebase.storage.TaskState.RUNNING) {
                  console.log(`Progress: ${progress}%`);
                 }
               },
               error => console.log(error.code),
               async () => {
                 const downloadURL = await uploadTask.snapshot.ref.getDownloadURL();
  
                }
               );
             } );
         Promise.all(promises)
          .then(() => alert('All files uploaded'))
          .catch(err => console.log(err.code));
   }
  











//When given a length generate a temp name for a file of given length
function generateTransactionID(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}




















  /*************************************************************************************/  
//Function to return a list of all templates related to the user account
 const retrieveTemplatesList = () => {
//TODO: Change this function to run against a specific user

  const db = firebase.firestore();
  db.collection("templates").where('userID', '==', 123)
  .get()
  .then(function(querySnapshot){
    querySnapshot.forEach(function(doc){
      listOfTemplates.push({value : doc.id, label: doc.get('templateName').templateName});
    });
    setTemplateList(listOfTemplates);
  })
  .catch(function(err){
    console.log("Error getting doc: "+ err);
  });

 };

 useEffect(() => initData(),[]); //Code executed on page load
  return (
    <div className={classes.container}>
     
        <div className={classes.optionsContainer}>
            <FormControl className={classes.formControl} placeholder="Type">
            
                <InputLabel id="demo-controlled-open-select-label">Select Template</InputLabel>
                <Select 
                    className={classes.select}
                    labelId="demo-controlled-open-select-label"
                    id="demo-controlled-open-select"
                    open={openTempSelect}
                    onClose={handleTempSelectClose}
                    onOpen={handleTempSelectOpen}
                    value={template}
                    onChange={handleTemplateChange}                   
                >
            {templateList.map((e, keyIndex) => {
              return (<MenuItem key={e.value} value={e.label}>{e.label}</MenuItem>);
            }) }
                </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
                <InputLabel id="demo-controlled-open-select2-label">Select Integration</InputLabel>
                <Select
                    className={classes.select}
                    labelId="demo-controlled-open-select2-label"
                    id="demo-controlled-open-select-2"
                    open={openIntSelect}
                    onClose={handleIntSelectClose}
                    onOpen={handleIntSelectOpen}
                    value={integration}
                    onChange={handleIntegrationChange}
                >
                    <MenuItem value="">
                    <em>None</em>
                    </MenuItem>

                    <MenuItem value={2}>Integration 2</MenuItem>
                    <MenuItem value={3}>Integration 3</MenuItem>
                </Select>
            </FormControl>
            <input
                accept="*/*"
                className={classes.input}
                id="contained-button-file"
                multiple
                type="file"
                onChange={handleFileUpload}
            />
            
            <label htmlFor="contained-button-file">
            <Button className={classes.button} variant="contained" color="primary" component="span">
                Add File
            </Button>
            </label>
                <Button 
                className={classes.button} 
                variant="contained" 
                color="primary" 
                onClick={handleSubmit} 
                >
                Submit
                </Button>
        </div>
        <div className ={classes.listContainer}>
        <List>
                { files.map( (file) => (
                <div key={file.size}>
                <ListItem>
                    <p>{file.name}</p>
                </ListItem>
                <Divider />
                </div>
                ))    
                }
            </List>
        </div>
    </div>
  );
}




export default Invoices