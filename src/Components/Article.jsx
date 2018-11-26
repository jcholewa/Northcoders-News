import React, { Component } from 'react';
import { getArticle, getComments } from '../api';
import { Link } from '@reach/router';
import Comments from './Comments';
import '../Comments.css'

class Article extends Component {
  state = {
    article: [],
    comments: [],
    loading: true,
    showComments: false
  }

  render() {
    return (
      this.state.loading === true ? <p>Loading...</p> :
        <div>
          <h1>{this.state.article.title}</h1>
          Author: <Link to={`/users/${this.state.article.created_by.username}`}> {this.state.article.created_by.username}</Link>
          <h4>Topic: {this.state.article.belongs_to}</h4>
          <p>{this.state.article.body}</p>
          <p>Comment count: {this.state.article.comment_count}</p>
          <button>Add a comment</button>
          {this.state.showComments ?
            <Comments comments={this.state.comments} article={this.state.article} /> : <p onClick={displayComments}>View comments</p>}
          <Link to={'/'}>Back to Home</Link>
        </div >
    );
  }

  componentDidMount() {
    console.log('mounting');
    getArticle(this.props.article_id)
      .then(article => {
        this.setState({
          article,
          loading: false
        })
      })
      .then(getComments(this.props.article_id)
        .then(comments => {
          this.setState({
            comments,
          })
        })
      )
      .catch(console.log)
  }

  displayComments = () => {
    this.setState({
      showComments: true
    })
  }

}

export default Article;