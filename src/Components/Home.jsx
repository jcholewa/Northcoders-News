import React, { Component } from 'react';
import Articles from './Articles';
import { getArticles } from '../api';

class Home extends Component {
  state = {
    articles: [],
    loading: true
  }

  render() {
    console.log('rendering')
    return (
      this.state.loading === true ? <p>Loading...</p> :
        <div className="home">
          <header>
            <h1>Northcoders News</h1>
          </header>
          <Articles articles={this.state.articles} />
          <footer>Footer</footer>
        </div>
    );
  }

  componentDidMount() {
    console.log('mounting')
    getArticles()
      .then(articles => {
        this.setState({
          articles,
          loading: false
        })
      })
      .catch(console.log)
  }

}

export default Home;