import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import LoginForm from './LoginForm';
import reportWebVitals from './reportWebVitals';
import {FirebaseProvider} from './FirebaseProvider.js';

ReactDOM.render(
  <FirebaseProvider>
    <App />
    <LoginForm />
  </FirebaseProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
