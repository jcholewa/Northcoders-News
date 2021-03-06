import { Link, navigate } from "@reach/router";
import React, { Component } from "react";
import Votes from "./Votes";
import SortBy from "./SortBy";
import ArticleAdder from "./ArticleAdder";
import Loading from "./Loading";
import { postArticle, deleteItem } from "../api";
import { getDate } from "../utils";
import { sortBy } from "underscore";
import propTypes from "prop-types";

class Articles extends Component {
  state = {
    articles: [],
    loading: true,
    article: "",
    title: "",
    topic: "",
    sortBy: "",
    addArticle: false,
    searchTerm: ""
  };

  render() {
    const { loading, addArticle, searchTerm, err, deleted } = this.state;

    const articles =
      this.state.articles.filter(
        article =>
          article.body.toLowerCase().includes(searchTerm.toLowerCase()) ||
          article.title.toLowerCase().includes(searchTerm.toLowerCase())
      ) || this.state.articles;

    if (loading) return <Loading />;
    if (err) return <p>{this.state.err}</p>;
    if (this.state.articles.length === 0)
      return (
        <div className="no-articles-topic">
          <p>There are no articles about {this.props.topic_slug}!</p>{" "}
          <Link to={"/"}>Back to Home</Link>{" "}
        </div>
      );

    return (
      <div>
        <>
          {addArticle ? (
            <ArticleAdder
              handleSubmit={this.handleSubmit}
              handleChange={this.handleChange}
              showArticleAdder={this.showArticleAdder}
              changeTopic={this.changeTopic}
              handleChangeTitle={this.handleChangeTitle}
              completed={this.state.completed}
            />
          ) : (
            <>
              <div className="searchBox">
                <input
                  aria-label="search box"
                  className="searchBar"
                  type="text"
                  placeholder="Search for articles..."
                  onChange={this.onSearchChange}
                  value={searchTerm}
                />
                <button onClick={this.onSearchSubmit}>Search</button>
              </div>
              <button
                className="add-article-button"
                onClick={this.showArticleAdder}
              >
                Add an article
              </button>
              <SortBy
                handleChangeSort={this.handleChangeSort}
                value={"articles"}
              />
              {deleted && <p className="deleted"> Article deleted! </p>}
              <ul className="articles">
                {articles.map(article => {
                  let dayPosted = getDate(article.created_at);
                  if (loading) return <p>Loading...</p>;
                  return (
                    <li key={article._id}>
                      <Link to={`/articles/${article._id}`}>
                        {article.title}
                      </Link>
                      {" by"}{" "}
                      <Link to={`/users/${article.created_by.username}`}>
                        {" "}
                        {article.created_by.username}
                      </Link>{" "}
                      {" on "}
                      {dayPosted}
                      {!this.props.topic_slug && (
                        <p className="article-topic">
                          Topic: {article.belongs_to}
                        </p>
                      )}
                      <p className="article-body">
                        {article.body.substring(0, 160)}...
                      </p>
                      <p className="article-comment-count">
                        {" "}
                        {article.comment_count}
                        {" comments "}{" "}
                      </p>
                      <Votes
                        id={article._id}
                        votes={article.votes}
                        type="articles"
                      />
                      {article.created_by.username ===
                        this.props.user.username && (
                        <button onClick={() => this.handleDelete(article._id)}>
                          Delete article
                        </button>
                      )}
                    </li>
                  );
                })}
              </ul>
              <a className="back-to-top" href="#top">
                Back to Top
              </a>
            </>
          )}
        </>
      </div>
    );
  }

  componentDidMount() {
    this.setState({
      loading: false,
      articles: this.props.articles
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.articles !== this.props.articles) {
      this.setState({
        loading: false,
        articles: this.props.articles
      });
    }
  }

  showArticleAdder = event => {
    event.preventDefault();
    this.setState(state => {
      return { addArticle: state.addArticle === true ? false : true };
    });
  };

  onSearchChange = event => {
    this.setState({
      searchTerm: event.target.value
    });
  };

  onSearchSubmit = event => {
    event.preventDefault();
  };

  handleChange = event => {
    this.setState({
      article: event.target.value
    });
  };

  handleChangeTitle = event => {
    this.setState({
      title: event.target.value
    });
  };

  changeTopic = event => {
    this.setState({
      topic: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (!this.state.title || !this.state.article || !this.state.topic) {
      this.setState({
        completed: false
      });
    }
    if (this.state.title && this.state.article && this.state.topic !== "")
      postArticle(
        this.state.title,
        this.state.article,
        this.state.topic,
        this.props.user._id
      )
        .then(article => {
          this.setState(state => {
            return { articles: [article, ...state.articles], completed: true };
          });
        })
        .then(() => {
          this.setState({
            article: "",
            title: "",
            topic: null,
            addArticle: false
          });
        })
        .catch(err => {
          navigate("/error", {
            replace: true,
            state: {
              code: err.response.status
            }
          });
        });
  };

  handleChangeSort = event => {
    const sortByValue = event.target.value;

    this.setState(state => {
      return {
        articles: sortByValue.includes("votes")
          ? sortByValue === "votes-desc"
            ? sortBy(state.articles, "votes").reverse()
            : sortBy(state.articles, "votes")
          : sortByValue === "time-desc"
          ? sortBy(state.articles, "created_at").reverse()
          : sortBy(state.articles, "created_at")
      };
    });
  };

  handleDelete = id => {
    deleteItem(id, "articles")
      .then(message => {
        this.setState({
          articles: this.state.articles.filter(article => article._id !== id),
          deleted: true
        });
      })
      .then(() => {
        window.scroll(0, 0);
      })
      .catch(console.log);
  };
}

Articles.propTypes = {
  articles: propTypes.array.isRequired,
  user: propTypes.object
};

export default Articles;
