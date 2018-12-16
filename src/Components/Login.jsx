import React, { Component } from "react";
import { login } from "../api";
import "../styles/Login.css";
import propTypes from "prop-types";

class Login extends Component {
  state = {
    username: "jessjelly"
  };

  render() {
    const { username, err } = this.state;

    if (this.props.user.username) return this.props.children;
    return err ? (
      <div>
        {" "}
        <p className='wrong-user'>User not found for this username. Please try again</p>
        <div className="login">
          <h3>Sign in to Northcoders News</h3>
          <form className="login-form" onSubmit={this.handleSubmit}>
            <div>
              <label htmlFor="username">Username: </label>
              <input
                aria-label="username"
                type="text"
                id="username"
                onChange={this.handleChange}
                value={username}
              />
            </div>
            <button>Log in</button>
          </form>
        </div>
      </div>
    ) : (
      <div className="login">
        <h3>Sign in to Northcoders News</h3>
        <form className="login-form" onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="username">Username: </label>
            <input
              aria-label="username"
              type="text"
              id="username"
              onChange={this.handleChange}
              value={username}
            />
          </div>
          <button>Log in</button>
        </form>
      </div>
    );
  }

  handleChange = event => {
    const { id, value } = event.target;
    this.setState({
      [id]: value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.username !== "") {
      login(this.state.username)
        .then(user => {
          this.props.userLogin(user.username);
        })
        .then(() => {
          this.setState({
            successfulLogin: true,
            err: false
          });
        })
        .catch(err => {
          this.setState({
            err: true
          });
        });
    }
  };
}

Login.propTypes = {
  userLogin: propTypes.func.isRequired,
  user: propTypes.object.isRequired
};

export default Login;