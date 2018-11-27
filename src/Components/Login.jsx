import React, { Component } from 'react';
import {login} from '../api';

class Login extends Component {
  state = {
    username: ''
  }

  render() {
    if (this.props.user.username) return this.props.children
    return (
      <div>
        <form onSubmit={this.handleSubmit} >
          <label htmlFor='username'>Username: </label>
          <input type='text' id='username' onChange={this.handleChange} value={this.state.username} />
          <label htmlFor='password'>Password: </label>
          <input type='password' id='password' onChange={this.handleChange} />
          <button>Log in</button>
        </form>
      </div >
    );
  }

  handleChange = event => {
    const {id, value} = event.target;
    this.setState({
      [id]: value
    })
  }

  handleSubmit = event => {
    event.preventDefault();
    login(this.state.username)
    .then(user => {
      this.props.login(user)
    })
  }
}

export default Login;