import React, { Component } from 'react';
import { getComments, alterVotes } from '../api'

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