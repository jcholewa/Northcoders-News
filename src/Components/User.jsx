import React, { Component } from "react";
import { getUser, getArticlesForUser } from "../api";
import { Link, navigate } from "@reach/router";
import Loading from "./Loading";

class User extends Component {
  state = {
    user: {},
    loading: true,
    userArticles: [],
    showArticles: false
  };

  render() {
    if (this.state.loading) return <Loading />;
    return (
      <div>
        <img src={this.state.user.avatar_url} alt="user's avatar" />
        <p>Username: {this.state.user.username}</p>
        <p>Name: {this.state.user.name}</p>
        {this.state.showArticles ? (
          <section>
            <h4>Articles by {this.state.user.username}:</h4>
            <ul>
              {this.state.userArticles.map(article => {
                {
                  return (
                    <div className="user-articles">
                      <Link to={`/articles/${article._id}`}>
                        {article.title}
                      </Link>
                    </div>
                  );
                }
              })}
            </ul>
          </section>
        ) : (
          <button onClick={this.displayArticles}>
            View list of articles by {this.state.user.username}
          </button>
        )}
        <br />
        <Link to={"/articles"}>Back to Home</Link>
      </div>
    );
  }

  componentDidMount() {
    getUser(this.props.username)
      .then(user => {
        this.setState({
          user,
          loading: false
        });
      })
      .then(() => {
        getArticlesForUser(this.state.user.username).then(articles => {
          this.setState({
            userArticles: articles
          });
        });
      })
      .catch(err => {
        navigate("/error", {
          replace: true,
          state: {
            code: err.response.status,
            message: 'Username does not exist'
          }
        });
      });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.username !== this.props.username) {
      getUser(this.props.username)
        .then(user => {
          this.setState({
            user,
            loading: false
          });
        })
        .catch(console.log);
    }
  }

  displayArticles = () => {
    this.setState({
      showArticles: true
    });
  };
}

export default User;
