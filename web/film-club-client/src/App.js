import React, { useState } from 'react';
import './App.css';



function App() {

const [results, setResults] = useState("Results go here")

// let buttonTest = () => {
//   setResults = "New results"
// }


  return (
    <div className="App">
      <header className="App-header">
        <h2>Welcome to Film-Club!</h2>
        <h4>"Rule #1: we dont talk about film-club!"</h4>
      </header>

      <main id="main">
        <button id="test-button" onClick={() => setResults("New results")}>Test Me</button>

        <div id="results">{results}</div>
      </main>
    </div>
  );
}

export default App;
