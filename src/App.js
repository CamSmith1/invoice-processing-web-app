import React from 'react';
import Labels from './Components/Labels'
import Navbar from './Components/Navbar'
import { makeStyles } from '@material-ui/core/styles';
import Main from './Components/Main'
import './App.css';

import firebase from '@firebase/app';
import '@firebase/firestore';
import { FirestoreProvider } from 'react-firestore';

const config = {
  apiKey: 'ya29.a0AfH6SMCQG7aEZibPvVFihHwfgfi2zzuAZoHicsXaGu9i6_Ik_e8rBwqyGN3xF_RdrqP8NFR04wG0aL3D1j7uNG0Jc3d17km-oYllrUVYXLFNKpsrgc_ThkQ1bhwf_0brIRh1KIHQMQfg06c41Vm8cZaezEKAKfEkCPJl6YM8CkyJvNvR4a5dIUNjaierrDRwUAWDO7nYELnswWgb0__O9ge-U9exHRS7al8wWS9BOS6JmNpeqI7m3AsteSWv616oRjwc4puZebp2',
  projectId: '462050905167',
  
};

firebase.initializeApp(config);

const useStyles = makeStyles((theme) => ({
  body : {
    display : 'flex'
  }
}));


const App = () => {
  const classes = useStyles();
  return (
    <FirestoreProvider firebase={firebase}>
    <div>   
    <Navbar/>
  
    <div className={classes.body}>
    <Labels/>
    <Main/>
    </div>
    </div>
    </FirestoreProvider>
    
    

  );
}

export default App;
