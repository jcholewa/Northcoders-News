import React, { Component } from "react";
import "./styles/App.css";
import Nav from "./Components/Nav";
import Home from "./Components/Home";
import Article from "./Components/Article";
import User from "./Components/User";
import Login from "./Components/Login";
import NotFound from "./Components/NotFound";
import BadRequest from "./Components/BadRequest";
import { Router } from "@reach/router";
import { login } from "./api";

class App extends Component {
  state = {
    user: {}
  };

  render() {
    return (
      <div className="App">
        <Nav user={this.state.user} userLogout={this.userLogout} />
        <div>
          <Login userLogin={this.userLogin} user={this.state.user}>
            <Router>
              <Home path="/" user={this.state.user} />
              <Home path="/articles" user={this.state.user} />
              <Home
                path="/topics/:topic_slug/articles"
                user={this.state.user}
              />
              <Article path="/articles/:article_id/*" user={this.state.user} />
              <User path="/users/:username" />
              <BadRequest path="/error" />
              <NotFound default />
            </Router>
          </Login>
        </div>
      </div>
    );
  }

  componentDidMount() {
    const savedData = JSON.parse(localStorage.getItem("user"));
    if (savedData) this.userLogin(savedData.username);
  }

  componentDidUpdate() {
    this.saveData();
  }

  userLogin = user => {
    if (user !== undefined) {
      login(user).then(user => {
        this.setState({
          user
        });
      });
    }
  };

  userLogout = () => {
    this.setState({
      user: {}
    });
  };
  saveData = () => {
    localStorage.setItem("user", JSON.stringify(this.state.user));
  };
}

export default App;
