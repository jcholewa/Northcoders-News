import React, { Component } from 'react';
import Nav from './Nav';
import Articles from './Articles';

class Home extends Component {
  render() {
    return (
      <div className="home">
        <header>
          <h1>Homepage</h1>
        </header>
        <Nav />
        <Articles />
        <footer>Footer</footer>
      </div>
    );
  }
}

export default Home;