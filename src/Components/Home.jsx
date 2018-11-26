import React, { Component } from 'react';
import Articles from './Articles';

class Home extends Component {
  render() {
    return (
      <div className="home">
        <header>
          <h1>Homepage</h1>
        </header>
        <Articles />
        <footer>Footer</footer>
      </div>
    );
  }
}

export default Home;