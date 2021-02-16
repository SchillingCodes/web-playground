import React, {useContext} from 'react';
import './App.css';
import {signOut} from './email.js';
import useFirebaseAuthentication from './useFirebaseAuthentication.js';
import {FirebaseContext} from './FirebaseProvider.js';
import CreateUserForm from './CreateUserForm';
import LoginForm from './LoginForm';

// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";
// If you are using v7 or any earlier version of the JS SDK, you should import firebase using namespace import
// import * as firebase from "firebase/app"

import "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA50OTyAvimezI7L7pqT1G5LIDBZ_7Xegw",
  authDomain: "web-playground-41e27.firebaseapp.com",
  projectId: "web-playground-41e27",
  storageBucket: "web-playground-41e27.appspot.com",
  messagingSenderId: "159707765797",
  appId: "1:159707765797:web:1bc4b921fc4c9f9c0f73cc",
  measurementId: "G-Z48FQGNM62"
};

// Intialize Firebase if it has not been previously initialized
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

function App(props) {
  const firebase = useContext(FirebaseContext);
  const authUser = useFirebaseAuthentication(firebase);
  
  return (
    <div className="App">
      <header className="App-header">
        <p>Yoyo</p>
        Hello, {getUid(authUser)}
      </header>
      <button onClick={signOut}>Sign Out</button>
      <CreateUserForm />
      <LoginForm /> 
    </div>
  );
}

function getUid(authUser) {
  if (authUser) return authUser.uid;
  else return "Stranger";
}

export default App;
