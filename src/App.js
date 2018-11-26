import React, { Component } from 'react';
import './App.css';
import Nav from './Components/Nav';
import Home from './Components/Home';
import Topics from './Components/Topics';
import Article from './Components/Article';
import Comments from './Components/Comments';
import User from './Components/User';
import { Router } from '@reach/router';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Nav />
        <div className="parent">
        <Router>
          <Home path='/' />
          <Home path='/articles' />
          <Topics path='/topics' />
          <Articles path='/topics/:topic_slug/articles' />
          <Article path='/articles/:article_id' />
          <Comments path='/comments/:comment_id' />
          <User path='/users/:username' />
        </Router>
        </div>
      </div>
    );
  }
}

export default App;
