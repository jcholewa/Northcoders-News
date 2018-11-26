import React, { Component } from 'react';
import { getArticle } from '../api';
import {Link} from '@reach/router';

class Article extends Component {
  state = {
    article: [],
    loading: true
  }

  render() {
    return (
      this.state.loading === true ? <p>Loading...</p> :
        <div>
          <h1>{this.state.article.title}</h1>
          Author: <Link to={`/users/${this.state.article.created_by.username}`}> {this.state.article.created_by.username}</Link>
          <h4>Topic: {this.state.article.belongs_to}</h4>
          <button>Add a comment</button>
          <p>{this.state.article.body}</p>
          <p>Comment count: {this.state.article.comment_count}</p>
          <p>Comment 1</p>
          <p>Comment 2</p>
        </div >
    );
  }

  componentDidMount() {
    console.log('mounting');
    getArticle(this.props.article_id)
      .then(article => {
        console.log(article)
        this.setState({
          article,
          loading: false
        })
      })
      .catch(console.log)
  }

}

export default Article;