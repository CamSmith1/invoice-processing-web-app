import React,{useState} from 'react';
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
  const classes = useStyles();
  const [template, setTemplate] = useState('');
  const [integration, setIntegration] = useState('');
  const [openTempSelect, setOpenTempSelect] = useState(false);
  const [openIntSelect , setOpenIntSelect] = useState(false);
  const [files , setFiles] = useState([]);
  let listOfTemplates = []; // List to be used for select template dropdown
  

  

  const [templateList , setTemplateList] =  useState([]);



  /********************Utility Functions******************************** */
  const handleTemplateChange = (event) => {
    setTemplate(event.target.value);

  };
  const initData = (event) => {
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
    //Populate template values
    setOpenTempSelect(true);


  };
  const handleIntSelectClose = () => {
    setOpenIntSelect(false);
  };

  const handleIntSelectOpen = () => {
    setOpenIntSelect(true);
  };

  /*************************************************************************************/  
//Function to return a list of all templates related to the user account
 const retrieveTemplatesList = () => {
//TODO: Change this function to run against a specific user

  const db = firebase.firestore();
  db.collection("templates").where('userID', '==', 123)
  .get()
  .then(function(querySnapshot){
    querySnapshot.forEach(function(doc){
      listOfTemplates.push(doc.get('templateName').templateName);
      console.log(doc.id, " =>", doc.data());
      setTemplateList(doc.get('templateName').templateName);
    });
    console.log('The values of array');
    console.log(listOfTemplates);
  })
  .catch(function(err){
    console.log("Error getting doc: "+ err);
  });

 };


  return (
    <div className={classes.container}>
      {initData}
        <div className={classes.optionsContainer}>
            <FormControl className={classes.formControl}>
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
                    <MenuItem value={1}>Google Sheet</MenuItem>
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
                onClick={retrieveTemplatesList} 
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