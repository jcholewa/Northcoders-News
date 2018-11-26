import React, { Component } from 'react';

class User extends Component {
  render() {
    return (
      <div>
        <h2>Username</h2>
        <p>User's avatar</p>
        <p>Name of user</p>
        <section>
          User's feed, displaying their latest articles written, comments made etc.
        </section>
      </div>
    );
  }
}

export default User;