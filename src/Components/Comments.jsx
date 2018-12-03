import React, { Component } from "react";
import { getComments, postComment, deleteItem } from "../api";
import Votes from "./Votes";
import SortBy from "./SortBy";
import Loading from "./Loading";
import { getDate } from "../utils";
import { sortBy } from "underscore";
import propTypes from "prop-types";

class Comments extends Component {
  state = {
    comments: [],
    comment: "",
    loading: true,
    completed: true
  };

  render() {
    const { loading, comments, comment, completed, deleted } = this.state;
    if (loading) return <Loading />;
    return (
      <div>
        {deleted && <p className='deleted'> Comment deleted! </p>}
        <h4>Comments</h4>
        {completed === false && (
          <p className="missing-fields">
            Please write a comment before trying to post a comment
          </p>
        )}
        <input
          aria-label="add a comment"
          type="text"
          placeholder="Add a comment..."
          onChange={this.handleChange}
          value={comment}
        />
        <button onClick={this.submitComment} id="postComment">
          Post comment
        </button>
        <ul className="commentsList">
          <SortBy handleChangeSort={this.handleChangeSort} value={"comments"} />
          {comments.map(comment => {
            let dayPosted = getDate(comment.created_at);
            return (
              <li className="commentsLI" key={comment._id}>
                <p className="comment-body">{comment.body}</p>
                <p className="comment-author">
                  {comment.created_by.username} posted this on {dayPosted}
                </p>
                <Votes id={comment._id} votes={comment.votes} type="comments" />
                {comment.created_by.username === this.props.user.username && (
                  <button onClick={() => this.handleDelete(comment._id)}>
                    Delete comment
                  </button>
                )}
              </li>
            );
          })}
        </ul>
        <a href="#top">Back to Top</a>
      </div>
    );
  }

  componentDidMount() {
    getComments(this.props.article_id)
      .then(comments => {
        this.setState({
          comments,
          loading: false
        });
      })
      .catch(console.log);
  }

  handleChange = event => {
    this.setState({
      comment: event.target.value
    });
  };

  submitComment = event => {
    event.preventDefault();
    if (!this.state.comment) {
      this.setState({
        completed: false
      });
    } else if (this.state.comment !== "")
      postComment(
        this.state.comment,
        this.props.article_id,
        this.props.user._id
      )
        .then(comment => {
          this.setState(state => {
            return {
              comments: [comment, ...state.comments],
              showComments: true
            };
          });
        })
        .then(() => {
          this.setState({
            comment: ""
          });
        })
        .catch(console.log);
  };

  handleDelete = id => {
    deleteItem(id, "comments")
      .then(message => {
        this.setState({
          comments: this.state.comments.filter(comment => comment._id !== id),
          deleted: true
        });
      })
      .then(() => {
        window.scroll(0, 0);
      })
      .catch(console.log);
  };

  // This will be the onChange for the select element:
  handleChangeSort = event => {
    const sortByValue = event.target.value;

    this.setState(state => {
      return {
        comments: sortByValue.includes("votes")
          ? sortByValue === "votes-desc"
            ? sortBy(state.comments, "votes").reverse()
            : sortBy(state.comments, "votes")
          : sortByValue === "time-desc"
          ? sortBy(state.comments, "created_at").reverse()
          : sortBy(state.comments, "created_at")
      };
    });
  };
}

Comments.propTypes = {
  article_id: propTypes.string.isRequired,
  user: propTypes.object
};

export default Comments;
