import React, { Component } from 'react';
import Articles from './Articles';
import User from './User';
import { getData, postArticle } from '../api';
import { getDate } from '../utils';
const _ = require('underscore');

class Home extends Component {
  state = {
    articles: [],
    loading: true,
  }

  render() {
    console.log('rendering')
    return (
      this.state.loading === true ? <p>Loading...</p> :
        <div className="home">
          {this.props.topic_slug !== undefined ?
            <header>
              <h1>News about {this.props.topic_slug}</h1>
            </header> :
            <header>
              <h1>Northcoders News</h1>
            </header>}
          {this.props.username ? <User /> :
            <Articles user={this.props.user} articles={this.state.articles} />}
          <footer>Footer</footer>
        </div>
    );
  }

  componentDidMount() {
    console.log('mounting')
    getData('', this.props.topic_slug)
      .then(articles => {
        this.setState({
          articles,
          loading: false
        })
      })
      .catch(console.log)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.topic_slug !== this.props.topic_slug) {
      getData('', this.props.topic_slug)
        .then(articles => {
          this.setState({
            articles,
            loading: false,
          })
        })
        .catch(console.log)
    }
  }

}

export default Home;