import React, { Component } from 'react';
import { login } from '../api';
import '../Login.css'

class Login extends Component {
  state = {
    username: 'jessjelly'
  }

  render() {
    if (this.props.user.username) return this.props.children
    return (
      <div className='login'>
        <h3>Sign in to Northcoder's News</h3>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor='username'>Username: </label>
            <input type='text' id='username' onChange={this.handleChange} value={this.state.username} />
          </div>
          <button>Log in</button>
        </form>
      </div >
    );
  }

  handleChange = event => {
    const { id, value } = event.target;
    this.setState({
      [id]: value
    })
  }

  handleSubmit = event => {
    event.preventDefault();
    login(this.state.username)
      .then(user => {
        this.props.userLogin(user.username)
      })
      .catch(console.log)
  }
}

export default Login;