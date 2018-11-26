import React, { Component } from 'react';
import './App.css';
import Nav from './Components/Nav';
import Articles from './Components/Articles';
import Article from './Components/Article';
import Comments from './Components/Comments';
import User from './Components/User';
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
        <Router>
          <Home path='/' />
          <Home path='/articles' />
          <Article path='/articles/:article_id' />
          <Comments path='/comments/:comment_id' />
          <User path='/users/username' />
        </Router>
        <footer>Footer</footer>
      </div>
    );
  }
}

export default App;
