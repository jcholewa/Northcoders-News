import React, { Component } from 'react';
import './App.css';
import Nav from './Components/Nav';
import Home from './Components/Home';
import Article from './Components/Article';
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
        <Nav user={this.state.user} userLogout={this.userLogout} />
        <div className="App">
          <Login userLogin={this.userLogin} user={this.state.user}>
            <Router>
              <Home path='/' user={this.state.user} />
              <Home path='/articles' userLogin={this.userLogin} user={this.state.user} />
              <Home path='/topics/:topic_slug/articles' />
              <Article path='/articles/:article_id/*' user={this.state.user} />
              <User path='/users/:username' />
            </Router>
          </Login>
        </div>
      </div >
    );
  }

  componentDidMount() {
    if (this.state.user.username) this.userLogin(this.state.user.username)
  }

  componentDidUpdate() {
    // if (this.state.user.username === this.props.username) this.userLogin(this.state.user.username)
  }

  userLogin = (user) => {
    login(user)
      .then(user => {
        this.setState({
          user
        })
      })
      .catch(console.log)
  }

  userLogout = () => {
    this.setState({
      user: {}
    })
  }

}

export default App;
