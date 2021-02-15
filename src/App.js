import logo from './logo.svg';
import './App.css';
import {signUpWithEmailPassword, signOut} from './email.js';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <button onClick={signUpWithEmailPassword}>test</button>
      <button onClick={signOut}>Sign Out</button>
    </div>
  );
}

export default App;
