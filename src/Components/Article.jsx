import React, { Component } from 'react';
import { getArticle} from '../api';
import { Link } from '@reach/router';
import '../Comments.css'
import Comments from './Comments'

class Article extends Component {
  state = {
    article: [],
    loading: true,
    showComments: false,
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

          {this.state.showComments ?
            <Comments article_id={this.state.article._id} comment={this.state.comment} user={this.props.user}/> :
            <button onClick={this.displayComments}>View comments</button>}
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
      .catch(console.log)
  }

  displayComments = () => {
    this.setState({
      showComments: true
    })
  }

}

export default Article;