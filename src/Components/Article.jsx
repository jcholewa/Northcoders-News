import React, { Component } from "react";
import { getData } from "../api";
import { Link, navigate } from "@reach/router";
import "../styles/Comments.css";
import Comments from "./Comments";
import Loading from "./Loading";
import Votes from "./Votes";
import propTypes from "prop-types";

class Article extends Component {
  state = {
    article: [],
    loading: true,
    showComments: false
  };

  render() {
    const { err, loading, article, comment, showComments } = this.state;
    if (err) return <p>{err}</p>;
    if (loading) return <Loading />;
    return (
      <div className="article">
        <h2>{article.title}</h2>
        by{" "}
        <Link to={`/users/${article.created_by.username}`}>
          {" "}
          {article.created_by.username}
        </Link>
        <h4>Topic: {article.belongs_to}</h4>
        <p className="indiv-article-body">{article.body}</p>
        <Votes id={article._id} votes={article.votes} type="articles" />
        {showComments ? (
          <Comments
            article_id={article._id}
            comment={comment}
            user={this.props.user}
          />
        ) : (
          <button onClick={this.displayComments}>
            View {article.comment_count} comments
          </button>
        )}
        <div>
          <Link to={"/articles"}>Back to Home</Link>
        </div>
      </div>
    );
  }

  componentDidMount() {
    getData(this.props.article_id)
      .then(article => {
        this.setState({
          article,
          loading: false
        });
      })
      .catch(err => {
        navigate('/error', {
          replace: true,
          state: {
            code: err.response.status,
            message: 'Article not found. Check the URL above in case you searched for the wrong link.'
          }
        })
      })
  }

  displayComments = () => {
    this.setState({
      showComments: true
    });
  };
}

Article.propTypes = {
  user: propTypes.object.isRequired
};

export default Article;
