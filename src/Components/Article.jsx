import React, { Component } from 'react';
import { getArticle, getComments, postComment, alterVotes } from '../api';
import { Link } from '@reach/router';
import '../Comments.css'
import Comments from './Comments'

class Article extends Component {
  state = {
    article: [],
    loading: true,
    showComments: false,
    comments: [],
    comment: '',
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
          <ul className='commentsList'>
            <input type='text' placeholder='Add a comment...' onChange={this.handleChange} value={this.state.comment} />
            <button onClick={this.submitComment} id='postComment'>Post comment</button>

            {this.state.showComments ?
              <Comments comments={this.state.comments} /> :
              <button onClick={this.displayComments}>View comments</button>}
            <Link to={'/'}>Back to Home</Link>
          </ul>
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

  handleChange = event => {
    this.setState({
      comment: event.target.value
    })
  }

  submitComment = event => {
    event.preventDefault()
    postComment(this.state.comment, this.state.article._id)
      .then(comment => {
        this.setState(state => {
          return { comments: [comment, ...state.comments], showComments: true }
        })
      })
      .then(() => {
        this.setState({
          comment: ''
        })
      })
      .catch(console.log)
  }

}

export default Article;