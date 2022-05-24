import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [response, setResponse] = React.useState(null);

  function handleSubmit(event:any) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData)

    fetch('http://localhost:3000/api', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => setResponse(data.msg));
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <form onSubmit={handleSubmit}>
          <input type='text' name='name'></input><br/>
          <input type='text' name='surname'></input><br/>
          <button>Receive a message</button>
        </form>
        { response ? 
          <>
            <div>Some Response</div>
            <p>{response}</p>
          </>
          : null }
      </header>
    </div>
  );
}

export default App;
