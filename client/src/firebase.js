import firebase from "firebase/app";
import "firebase/auth";

 var firebaseConfig = {
    apiKey: "AIzaSyD1JrvwmfUoUJET-q9CkfKQSg_bLsh6_TA",
    authDomain: "ecommerce-3b4ce.firebaseapp.com",
    projectId: "ecommerce-3b4ce",
    storageBucket: "ecommerce-3b4ce.appspot.com",
    messagingSenderId: "1081593344640",
    appId: "1:1081593344640:web:e49474528865825a3bac65",
    measurementId: "G-MR2C7P0NZK"
  };


    firebase.initializeApp(firebaseConfig);

  // export
  // export default firebase;
  export const auth = firebase.auth();
  export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();