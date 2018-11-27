import { Link } from '@reach/router';
import React, { Component } from 'react';
import { getTopics } from '../api';

class Nav extends Component {
  state = {
    topics: [],
    loading: true,
    articles: []
  }

  render() {
    return (
      this.state.loading ? <p>Loading...</p> :
        <div className="nav">
          <nav>
            <Link to='/'>Home</Link>
            {'   |   '}
            {this.state.topics.map(topic => {
              return <> <Link to={`/topics/${topic.slug}/articles`}>{topic.title}</Link>
              { '   |   ' }
              </>
            })}
          </nav>
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

export default Nav;