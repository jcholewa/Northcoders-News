import React, { Component } from 'react';
import './App.css';
import Nav from './Components/Nav';
import Home from './Components/Home';
import Topics from './Components/Topics';
import Article from './Components/Article';
import TopicArticles from './Components/TopicArticles';
import Comments from './Components/Comments';
import User from './Components/User';
import { Router } from '@reach/router';

class App extends Component {
  render() {
    return (
      <div>
        <Nav />
        <div className="App">
          <Router>
            <Home path='/' />
            <Home path='/articles' />
            <Topics path='/topics' />
            <TopicArticles path='/topics/:topic_slug/articles' />
            <Article path='/articles/:article_id/' />
            <Comments path='/comments/:comment_id' />
            <User path='/users/:username' />
          </Router>
        </div>
      </div >
    );
  }
}

export default App;
