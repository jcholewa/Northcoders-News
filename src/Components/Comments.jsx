import React, { Component } from 'react';
import { getComments, postComment, deleteItem } from '../api';
import Votes from './Votes';
import SortBy from './SortBy';
import Loading from './Loading';
import { getDate } from '../utils';
import { sortBy } from 'underscore';

class Comments extends Component {
  state = {
    comments: [],
    comment: '',
    loading: true,
  }

  render() {
    if (this.state.loading) return <Loading />
    return (
      <div>
        <h4 id='top'>Comments</h4>
        <input type='text' placeholder='Add a comment...' onChange={this.handleChange} value={this.state.comment} />
        <button onClick={this.submitComment} id='postComment'>Post comment</button>
        <ul className='commentsList'>

          <SortBy handleChangeSort={this.handleChangeSort} handleSortBySubmit={this.handleSortBySubmit} value={'comments'} />
          {this.state.comments.map(comment => {
            let dayPosted = getDate(comment.created_at)
            return <li className='commentsLI' key={comment._id}>{comment.body} <br />
              Author: {comment.created_by.username} <br />
              <p>Posted on: {dayPosted}</p>
              <Votes id={comment._id} votes={comment.votes} type='comments' />

              {(comment.created_by.username === this.props.user.username) && <button onClick={(() => this.handleDelete(comment._id))}>Delete comment</button>}
            </li>
          })}
        </ul>
        <a href='#top'>Back to Top</a>
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
    if (this.state.comment !== '')
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
    deleteItem(id, 'comments')
      .then(message => {
        this.setState({
          comments: this.state.comments.filter(comment => comment._id !== id)
        })
      })
      .then(() => {
        window.alert('Comment deleted!')
      })
      .catch(console.log)
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
    this.setState(state => {
      return {
        comments: state.sortBy.includes('votes') ? state.sortBy === 'votes-desc' ? sortBy(state.comments, 'votes').reverse() : sortBy(state.comments, 'votes') : state.sortBy === 'time-desc' ? sortBy(state.comments, 'created_at').reverse() : sortBy(state.comments, 'created_at')
      }
    })
  }

}

export default Comments;