import React, { Component } from 'react';
import { getComments, postComment } from '../api';
import Votes from './Votes';

class Comments extends Component {
  state = {
    comments: [],
    comment: '',
    loading: true
  }


  render() {
    return (
      this.state.loading ? <p>Loading...</p> :
        <div>
          <h4>Comments</h4>
          <input type='text' placeholder='Add a comment...' onChange={this.handleChange} value={this.state.comment} />
          <button onClick={this.submitComment} id='postComment'>Post comment</button>
          <ul className='commentsList'>
            {this.state.comments.map(comment => {
              return <li className='commentsLI' key={comment._id}>{comment.body} <br />
                Author: {comment.created_by.username} <br />
                <Votes id={comment._id} votes={comment.votes} type='comments' />
                {(comment.created_by.username === this.props.user.username) ? <button>Delete comment</button> : <> </>}
              </li>
            })}
          </ul>
        </div>
    );
  }

  componentDidMount() {
    getComments(this.props.article_id)
      .then(comments => {
        this.setState({
          comments,
          loading: false
        })
      })
      .catch(console.log)
  }

  handleChange = event => {
    this.setState({
      comment: event.target.value
    })
  }

  submitComment = event => {
    event.preventDefault()
    postComment(this.state.comment, this.props.article_id, this.props.user._id)
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

export default Comments;