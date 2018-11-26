import React, { Component } from 'react';
import './App.css';
import Nav from './Components/Nav';
import Articles from './Components/Articles';
import { Router } from '@reach/router';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header>
          <h1>Homepage</h1>
        </header>
        <Nav />
        <Articles />
        <footer>Footer</footer>
      </div>
    );
  }
}

export default App;
