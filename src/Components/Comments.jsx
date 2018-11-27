import React, { Component } from 'react';
import { getComments, alterVotes, postComment } from '../api'

class Comments extends Component {
  state = {
    comments: [],
    comment: '',
    loading: true
  }


  render() {
    return (
      <div>
        <h4>Comments</h4>
        <input type='text' placeholder='Add a comment...' onChange={this.handleChange} value={this.state.comment} />
            <button onClick={this.submitComment} id='postComment'>Post comment</button>
        <ul className='commentsList'>
          {this.state.comments.map((comment, index) => {
            return <li className='commentsLI' key={comment._id}>{comment.body} <br />
              Votes: {comment.votes} <br />
              Author: {comment.created_by.username} <br />
              <button onClick={() => this.handleVote(index)} value='up'>Upvote</button>
              <button onClick={() => this.handleVote(index)} value='down'>Downvote</button>
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

  handleVote = event => {
    const currentComment = this.state.comments[event]
    alterVotes(this.state.comments[event]._id, event.value)
      .then(comment => {
        console.log(comment)
        this.setState({
          [currentComment]: comment
        })
      })
      .catch(console.log)
  }
}

export default Comments;