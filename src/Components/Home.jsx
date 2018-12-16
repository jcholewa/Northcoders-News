import React, { Component } from "react";
import Articles from "./Articles";
import Loading from "./Loading";
import { getData } from "../api";
import propTypes from "prop-types";

class Home extends Component {
  state = {
    articles: [],
    loading: true
  };

  render() {
    const { loading, articles } = this.state;

    if (loading) return <Loading />;
    return (
      <div id="top" className="home">
        {this.props.topic_slug !== undefined && (
          <header>
            <h3>News about {this.props.topic_slug}</h3>
          </header>
        )}
        <Articles
          user={this.props.user}
          articles={articles}
          topic_slug={this.props.topic_slug}
        />
      </div>
    );
  }

  componentDidMount() {
    getData("", this.props.topic_slug)
      .then(articles => {
        this.setState({
          articles,
          loading: false
        });
      })
      .catch(console.log);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.topic_slug !== this.props.topic_slug) {
      getData("", this.props.topic_slug)
        .then(articles => {
          this.setState({
            articles,
            loading: false
          });
        })
        .catch(console.log);
    }
  }
}

Home.propTypes = {
  topic_slug: propTypes.string,
  user: propTypes.object.isRequired
};

export default Home;
