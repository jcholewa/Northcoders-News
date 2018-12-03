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
    const { loading, user, showArticles, userArticles } = this.state;

    if (loading) return <Loading />;
    return (
      <div>
        <img src={user.avatar_url} alt={`${user.username}'s avatar`} onError="this.onError=null; this.src='xyz'"/>
        {/* onError={this.onError=null this.src='imagefound.gif';} */}
        <p>Username: {user.username}</p>
        <p>Name: {user.name}</p>
        {showArticles ? (
          <section>
            <h4>Articles by {user.username}:</h4>
            <ul>
              {userArticles.map(article => {
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
            View list of articles by {user.username}
          </button>
        )}
        <div>
          <Link to={"/articles"}>Back to Home</Link>
        </div>
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
            message: "Username does not exist"
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
