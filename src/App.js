import React, { Component } from 'react';
import './App.css';
import Nav from './Components/Nav';
import {Router} from '@reach/router';

class App extends Component {
  render() {
    return (
      <div >
        <header>
          <h1>Homepage</h1>
        </header>
        <Nav />
        
      </div>
    );
  }
}

export default App;
