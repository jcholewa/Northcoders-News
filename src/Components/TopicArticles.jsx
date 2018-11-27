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
          <h2>Articles about {this.props.topic_slug}</h2>
          <ul>
            {this.state.articles.map(article => {
              return (
                <li key={article._id} >
                  <Link to={`/articles/${article._id}`}>{article.title}</Link>
                  <p>by {article.created_by.name}</p>
                  <p>{article.body.substring(0, 160)}...</p>
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
        this.setState({
          articles: articles.filter(article => article.belongs_to === this.props.topic_slug),
          loading: false
        })
      })
      .catch(console.log)
  }
}

export default TopicArticles;