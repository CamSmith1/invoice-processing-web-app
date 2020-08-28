import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {connect} from 'react-redux'
import {addLabel} from '../Redux/labels/label-actions'
import ReactCrop from 'react-image-crop';
import TextField from '@material-ui/core/TextField';

import Button from '@material-ui/core/Button';
import 'react-image-crop/dist/ReactCrop.css';

import '@firebase/firestore';
import firebase from '@firebase/app';
import firestore from "./Firestore";




const useStyles = makeStyles((theme) => ({
  content: {
    height : '89vh',
    display : "flex",
    flexDirection : "column",
    justifyContent : 'space-between',
    flexGrow: 1,

    
  },
  imageDiv : {
    height : '100%',
    overflow : 'scroll',
    flexBasis: '100%',
  },
  image : {
    width: '100%',
  },
  buttonRoot: {
    display : 'flex',
    justifyContent : 'space-between',
    marginTop : '20px',

    flexBasis: '10%',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: 'none',
  },
  label : {
    margin : '0 15px 0 15px'
  }
}));

const Main = ({labels, addLabel}) => {
  const classes = useStyles();
  const [src , selectFile] = useState(null)
  const [crop , setCrop] = useState({})
  const [id , setId] = useState(0)
  const [label , setLabel] =  useState("")
  const handleFileChange = e => {
    console.log(e.target.files[0])
    selectFile(URL.createObjectURL(e.target.files[0]))
  }

  const isEmpty = (obj) => { 
    for (var x in obj) { return false; }
    return true;
 }
  const getCroppedImg = () =>{
    if(!isEmpty(crop)){
      if(crop.height !== 0 && crop.width !== 0 && label.length > 0){
        setId(id + 1);
        addLabel({
          id,
          x : crop.x,
          y : crop.y,
          width : crop.width,
          height : crop.height,
          label,
          crop
        })
        setCrop({});
      } 
    }
    
    setLabel("")
    
  }

  //function to save template if template has at least 1 label in it
  const saveToDB = () =>{

    //convert labels array into an array of objects to cast as Map for firebase format
    var labelsList = [];
    for(var i in labels){
      var lbl = new labelObj(labels[i].id,labels[i].x,labels[i].y,labels[i].width,labels[i].height,labels[i].label);
      labelsList.push(lbl);
    }

      const lbls = labelsList.map((obj)=> {return Object.assign({}, obj)});
      var userID = 123; //Demo userID to populate later
      var templateName = "DemoTemplate";
      const db = firebase.firestore();


      const template = db.collection('templates').add({
        userID: userID,
        templateName: templateName,
        labels: lbls

      });  
      console.log(template); 

  }

 

//TODO: https://stackoverflow.com/questions/61637191/how-to-convert-pdf-to-image-in-reactjs
//Implement the ability to convert PDF to Image
  return (
    <main className={classes.content}>
        
          {
            src && ( <div className={classes.imageDiv}>
              <ReactCrop className={classes.image} src={src} crop={crop} onChange={newCrop => setCrop(newCrop)}/>
            </div>
            )
          }
        <div className={classes.buttonRoot}>
          <div>
          <input
                accept="image/*"
                className={classes.input}
                id="contained-button-file"
                multiple
                type="file"
                onChange={handleFileChange}
            />
            
            <label htmlFor="contained-button-file">
            <Button variant="contained" color="primary" component="span">
                Upload
            </Button>
            </label>
            <TextField
              className={classes.label}
              id="outlined-secondary"
              size="small"
              label="Label"
              variant="outlined"
              color="secondary"
              value={label}
              onChange={(event) => setLabel(event.target.value)}
            />
            <Button variant="contained" color="primary" onClick={getCroppedImg}>
              Select Area
            </Button>
 
          </div>
          
            <Button variant="contained" color="primary" onClick={saveToDB} >
              Submit
            </Button>
        </div>
    </main>
  );
}


const mapStateToProps = state => {
  return{
    labels : state.labels
  }
}

const mapDispatchToProps = dispatch => {
  return{
    addLabel : (label) => dispatch(addLabel(label))
   
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Main)


//Label object for firestore payload
 class labelObj {
  constructor(id, x,y,width,height,label) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.label = label;
  }
}