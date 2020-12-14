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

 
 //let templateSelected = false;
  const classes = useStyles();
  const [template, setTemplate] = useState('');
  const [templateJSON, setTemplateJSON] = useState(''); //The value of the selected template to be used in JSON
  const [openTempSelect, setOpenTempSelect] = useState(false);
  const [templateSelected, setTemplateSelected] = useState(false);
  const [files , setFiles] = useState([]);
  const listOfTemplates = []; // List to be used for select template dropdown
  const [templateList , setTemplateList] =  useState([]);


  /********************Utility Functions******************************** */
  const handleTemplateChange = (event) => {
    setTemplate(event.target.value);
    setTemplateSelected(true)
    setTemplateJSON(event.target.value) ; 

  };
  const initData = () => {
    retrieveTemplatesList();
  };
  
  const handleFileUpload = (event) => {
    const arr = files.concat(Object.values(event.target.files));
    setFiles(arr)
    console.log(arr)
  };

  const handleTempSelectClose = () => {
    setOpenTempSelect(false);
  };

  const handleTempSelectOpen = () => {

    
    setOpenTempSelect(true);
  };

  //Promise function to read files with file reader
  function readFiletoB64(item)
  {
    return new Promise((resolve, reject) => {
      console.log('In the promise')
      var reader = new FileReader()
      reader.readAsDataURL(item);
      reader.onload = function () {
        //Successfully converted the pdf to b64
         let b64PDFObj = {base64: reader.result};
        resolve(b64PDFObj)
      };
    });
  };

  //Send a query to Lambda to process data
  async function handleSubmit(){

    console.log('is a template selected? ' + templateSelected)
   if(templateSelected === true){
      let arr = [];
      for(var i = 0; i < files.length; i++){
       // let item = ;
        let fileData = await readFiletoB64(files[i]); //Base64 data of the file
        arr.push(fileData)
      }

      var jsonBody = buildocrPayload(arr);
      //
     
   }
  }

  //Builds a JSON structure for the payload to send to Lambda for OCR
  function buildocrPayload (filesArr) {
    var JSONBody = {
      "template":{
        "labels": templateJSON
      },
      "pdffiles": {
        "files": filesArr
      }
    };
    return JSONBody;

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
      console.log(doc.get('labels'));
      listOfTemplates.push({value : doc.get('labels'), label: doc.get('templateName').templateName});
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
              return (<MenuItem key={e.label} value={e.value}>{e.label}</MenuItem>);
            }) }
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