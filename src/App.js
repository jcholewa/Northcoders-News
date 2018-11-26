import React, { Component } from 'react';
import './App.css';
import Home from './Components/Home';
import Article from './Components/Article';
import Comments from './Components/Comments';
import User from './Components/User';
import { Router } from '@reach/router';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Home path='/' />
          <Home path='/articles' />
          <Article path='/articles/:article_id' />
          <Comments path='/comments/:comment_id' />
          <User path='/users/username' />
        </Router>
      </div>
    );
  }
}

export default App;
