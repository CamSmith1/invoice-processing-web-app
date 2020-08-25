import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {connect} from 'react-redux'
import {addLabel} from '../Redux/labels/label-actions'
import ReactCrop from 'react-image-crop';
import TextField from '@material-ui/core/TextField';

import Button from '@material-ui/core/Button';
import 'react-image-crop/dist/ReactCrop.css';

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
              Crop
            </Button>
          </div>
            
            <Button variant="contained" color="primary" onClick={() => console.log(labels)}>
              Log
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
