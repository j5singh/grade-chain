import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  var nome = 'lorenzo'
  var cognome = 'cipelli'
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <form action='http://localhost:3001/api' method='get'>
          <input type='text' value={nome} name='name'></input><br/>
          <input type='text' value={cognome} name='surname'></input><br/>
          <button type="submit"> premi qui</button>
        </form>
        {nome}
        {cognome}
      </header>
    </div>
  );
}

export default App;
