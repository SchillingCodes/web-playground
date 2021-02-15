import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import LoginForm from './LoginForm';
import reportWebVitals from './reportWebVitals';

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

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    var uid = user.uid;
    ReactDOM.render(
      <p>Hello, {uid}</p>,
      document.getElementById('profile')
    );
    // ...
  } else {
    // User is signed out
    ReactDOM.render(
      <p>Hello, Stranger</p>,
      document.getElementById('profile')
    );
  }
});

ReactDOM.render(
  <React.StrictMode>
    <App />
    <LoginForm />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
