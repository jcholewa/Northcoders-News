import React, { Component } from 'react';
import Articles from './Articles';
import { getArticles } from '../api';

class Home extends Component {
  state = {
    articles: []
  }

  render() {
    return (
      <div className="home">
        <header>
          <h1>Homepage</h1>
        </header>
        <Articles articles={this.state.articles} />
        <footer>Footer</footer>
      </div>
    );
  }

  componentDidMount() {
    getArticles()
      .then(articles => {
        this.setState({
          articles
        })
      })
      .catch(console.log)
  }

}

export default Home;