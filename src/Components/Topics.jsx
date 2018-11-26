import React, { Component } from 'react';
import { getTopics } from '../api';
import { Link } from '@reach/router';
import '../Topics.css';

class Topics extends Component {
  state = {
    topics: [],
    loading: true,
    articles: []
  }

  render() {
    return (
      this.state.loading ? <p>Loading...</p> :
        <div className='parent'>
          <header>
            <h1>Topics</h1>
          </header>
          <ul className="topicsList">
            {this.state.topics.map(topic => {
              return <li className="topicsLI">
                <Link to={`/topics/${topic.slug}/articles`}>{topic.title}</Link>
              </li>
            })}
          </ul>
        </div>
    );
  }

  componentDidMount() {
    getTopics()
      .then(topics => {
        this.setState({
          topics,
          loading: false
        })
      })
  }
}

export default Topics;