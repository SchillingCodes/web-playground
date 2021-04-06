import React, {useContext, useState, useEffect} from 'react';
import './App.css';
import {signOut} from './email.js';
import useFirebaseAuthentication from './useFirebaseAuthentication.js';
import {FirebaseContext} from './FirebaseProvider.js';
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';
import Profile from './Profile';

// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";
// If you are using v7 or any earlier version of the JS SDK, you should import firebase using namespace import
// import * as firebase from "firebase/app"

import "firebase/auth";
import "firebase/firestore";

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

var db = firebase.firestore();

function App(props) {
  const firebase = useContext(FirebaseContext);
  const authUser = useFirebaseAuthentication(firebase);
  const [profile, setProfile] = useState(null);
  
  return (
    <div className="App">
      <header className="App-header">
        <p>Yoyo {profile}</p>
      </header>
      {authUser && profile!=null && <button onClick={() => {setProfile(null);}}>Change Profile</button>}
      {authUser && <button onClick={() => {setProfile(null); signOut();}}>Sign Out</button>}
      {!authUser && profile==null && <RegisterForm/>}
      {!authUser && profile==null && <LoginForm/>}
      {authUser && profile==null && <Profile user={authUser} db={db} doc="profile1" onProfileClick={setProfile}/>}
      {authUser && profile==null && <Profile user={authUser} db={db} doc="profile2" onProfileClick={setProfile}/>}
      {authUser && profile==null && <Profile user={authUser} db={db} doc="profile3" onProfileClick={setProfile}/>}
    </div>
  );
}

export default App;
