import React, { Component } from 'react';
import { getUser } from '../api';

class User extends Component {

  state = {
    user: {},
    loading: true
  }

  render() {
    console.log(this.state.user)
    return (
      this.state.loading ? <p>Loading...</p> :
        <div>
          <h2>Username: {this.state.user.username}</h2>
          <img src={this.state.user.avatar_url} alt="user's avatar"></img>
          <p>Name: {this.state.user.name}</p>
          <section>
            User's feed, displaying their latest articles written, comments made etc.
        </section>
        </div>
    );
  }

  componentDidMount() {
    getUser(this.props.username)
      .then(user => {
        this.setState({
          user,
          loading: false
        })
      })
  }
}

export default User;