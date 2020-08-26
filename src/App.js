import React from 'react';
import Labels from './Components/Labels'
import Navbar from './Components/Navbar'
import { makeStyles } from '@material-ui/core/styles';
import Main from './Components/Main'
import './App.css';

const useStyles = makeStyles((theme) => ({
  body : {
    display : 'flex'
  }
}));


const App = () => {
  const classes = useStyles();
  return (
    <div>  
    <Navbar/>
    <div className={classes.body}>
    <Labels/>
    <Main/>
    </div>
    </div>

  );
}

export default App;
