import React, { Component } from 'react';
import { getTopics } from '../api';
import '../Topics.css';

class Topics extends Component {
  state = {
    topics: [],
    loading: true
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
              return <li className="topicsLI">{topic.title}</li>
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