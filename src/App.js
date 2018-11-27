import React, { Component } from 'react';
import './App.css';
import Nav from './Components/Nav';
import Home from './Components/Home';
import Article from './Components/Article';
import TopicArticles from './Components/TopicArticles';
import User from './Components/User';
import Login from './Components/Login'
import { Router } from '@reach/router';
import { login } from './api';

class App extends Component {
  state = {
    user: {}
  }

  render() {
    return (
      <div>
        <Nav />
        <div className="App">
          <Login login={this.login} user={this.state.user}>
            <Router>
              <Home path='/' user={this.state.user} />
              <Home path='/articles' user={this.state.user} />
              <TopicArticles path='/topics/:topic_slug/articles' />
              <Article path='/articles/:article_id/*' user={this.state.user} />
              <User path='/users/:username' />
            </Router>
          </Login>
        </div>
      </div >
    );
  }

  componentDidMount() {
    login(this.state.user)
  }

  componentDidUpdate() {
    login(this.state.user)
  }

  login = (user) => {
    this.setState({
      user
    })
  }

}

export default App;
