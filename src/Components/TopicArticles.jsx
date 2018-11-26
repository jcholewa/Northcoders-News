import React, { Component } from 'react';
import { getArticles } from '../api';
import { Link } from '@reach/router';

class TopicArticles extends Component {
  state = {
    articles: [],
    loading: true
  }

  render() {
    return (
      this.state.loading ? <p>Loading...</p> :
        <div>
          <ul>
            {this.state.articles.map(article => {
              return (
                <li key={article._id}>
                  <Link to={`/articles/${article._id}`}>{article.title}</Link>
                </li>
              )
            })}
          </ul>
        </div>
    );
  }
  componentDidMount() {
    getArticles()
      .then(articles => {
        console.log(articles)
        this.setState({
          articles: articles.filter(article => article.belongs_to === this.props.topic_slug),
          loading: false
        })
      })
  }
}

export default TopicArticles;