import React, {useState} from 'react';
import {signUpWithEmailPassword} from './email.js';

function RegisterForm() {
  const [values, setValues] = useState({
    email: '',
    password: ''
  });

  const handleEmailChange = (event) => {
    setValues({...values, email: event.target.value})
  }

  const handlePasswordChange = (event) => {
    setValues({...values, password: event.target.value})
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    signUpWithEmailPassword(values.email, values.password);
  }

  return(
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input name="email" type="email" value={values.email} onChange={handleEmailChange} />
        </label>
        <label>
          Password:
          <input name="password" type="password" value={values.password} onChange={handlePasswordChange} />
        </label>
        <input type="submit" value="Login" />
      </form>
    </div>
  );
}

export default RegisterForm;