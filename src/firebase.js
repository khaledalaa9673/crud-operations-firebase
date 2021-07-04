import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

var  firebaseConfig = {
    apiKey: "AIzaSyDfYPPlSH78tzd2JQ2pxiIBYNIXlIGQ5_A",
    authDomain: "task99-4906b.firebaseapp.com",
    databaseURL: "https://task99-4906b-default-rtdb.firebaseio.com",
    projectId: "task99-4906b",
    storageBucket: "task99-4906b.appspot.com",
    messagingSenderId: "566144107005",
    appId: "1:566144107005:web:4faba3baac721336f41994",
    measurementId: "G-0KCRNNVLCP"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
 
 export default firebase