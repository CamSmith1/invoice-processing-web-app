import firebaseStore from 'firebase';
import firebase from "firebase/app";
import "firebase/auth";

const config = {
    apiKey: "AIzaSyBOIiacS3w4whTch22smDZLBJsSxi-yWMU",
    authDomain: "invoice-processing-webapp.firebaseapp.com",
    databaseURL: "https://invoice-processing-webapp.firebaseio.com",
    projectId: "invoice-processing-webapp",
    storageBucket: "invoice-processing-webapp.appspot.com",
    messagingSenderId: "462050905167",
    appId: "1:462050905167:web:2ea7a3e1c190728711ee3a",
    measurementId: "G-YH2KHKPF4L"
  };
  
  firebase.initializeApp(config);
 

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebaseStore.storage();


export default firebase; 
