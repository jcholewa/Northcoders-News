import React, { Component } from 'react';
import { getComments, postComment, deleteItem } from '../api';
import Votes from './Votes';
import SortBy from './SortBy';
const _ = require('underscore');

class Comments extends Component {
  state = {
    comments: [],
    comment: '',
    loading: true,
  }

  render() {
    return (
      this.state.loading ? <p>Loading...</p> :
        <div>
          <h4>Comments</h4>
          <input type='text' placeholder='Add a comment...' onChange={this.handleChange} value={this.state.comment} />
          <button onClick={this.submitComment} id='postComment'>Post comment</button>
          <ul className='commentsList'>

            <SortBy handleChangeSort={this.handleChangeSort} handleSortBySubmit={this.handleSortBySubmit} />

            {this.state.comments.map(comment => {
              let date = new Date(comment.created_at)
              let day = date.getDay()
              let month = date.getMonth()
              let year = date.getFullYear()
              return <li className='commentsLI' key={comment._id}>{comment.body} <br />
                Author: {comment.created_by.username} <br />
                <p>Posted on: {day}/{month}/{year}</p>
                <Votes id={comment._id} votes={comment.votes} type='comments' />
                {(comment.created_by.username === this.props.user.username) ? <button onClick={(() => this.handleDelete(comment._id))}>Delete comment</button> : <> </>}
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

  handleDelete = (id) => {
    deleteItem(id)
      .then(message => {
        this.setState({
          comments: this.state.comments.filter(comment => comment._id !== id)
        })
      })
  }

  // This will be the onChange for the select element:
  handleChangeSort = event => {
    this.setState({
      sortBy: event.target.value
    })
  }

  // This will be the onClick for the whole form element:
  handleSortBySubmit = (event) => {
    event.preventDefault();
    console.log(this.state.comments)
    this.setState(state => {
      return {
        comments: state.sortBy === 'votes' ? _.sortBy(state.comments, 'votes').reverse() : _.sortBy(state.comments, 'created_at').reverse()
      }
    }, () => { console.log(this.state.comments) })
  }

}

export default Comments;