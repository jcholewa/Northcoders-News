import { Link } from "@reach/router";
import React, { Component } from "react";
import { getData } from "../api";
import Loading from "./Loading";
import propTypes from "prop-types";

class Nav extends Component {
  state = {
    topics: [],
    loading: true,
    articles: []
  };

  render() {
    const { loading, topics } = this.state;

    if (loading) return <Loading />;
    return (
      <header>
        <div className="logo">
          <h1 className="nc-news">Northcoders News</h1>
        </div>
        <nav>
          <ul className="nav-ul">
            <li className="nav-li">
              <Link className="link" to="/">
                Home
              </Link>
            </li>
            {topics.map((topic, index) => {
              return (
                <li className="nav-li">
                  <Link
                    className="link"
                    to={`/topics/${topic.slug}/articles`}
                    key={index}
                  >
                    {topic.title}{" "}
                  </Link>
                </li>
              );
            })}

            {this.props.user.username && (
              <div className="logged-in">
                <li className="nav-li-right">
                  <Link
                    className="user-logged-in"
                    to={`/users/${this.props.user.username}`}
                  >
                    {this.props.user.username} is logged in
                  </Link>
                  <button onClick={this.props.userLogout}>Log Out</button>{" "}
                </li>
              </div>
            )}
          </ul>
        </nav>
      </header>
    );
  }

  componentDidMount() {
    getData("", "all")
      .then(topics => {
        this.setState({
          topics,
          loading: false
        });
      })
      .catch(console.log);
  }
}

Nav.propTypes = {
  userLogout: propTypes.func.isRequired,
  user: propTypes.object.isRequired
};

export default Nav;
