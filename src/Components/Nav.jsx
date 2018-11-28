import { Link } from '@reach/router';
import React, { Component } from 'react';
import { getData } from '../api';

class Nav extends Component {
  state = {
    topics: [],
    loading: true,
    articles: []
  }

  render() {
    return (
      this.state.loading ? <p>Loading...</p> :
        <>
          <div className="nav">
            <nav>
              <Link to='/'>Home</Link>
              {'     |     '}
              {this.state.topics.map((topic, index) => {
                if (index !== this.state.topics.length - 1)
                  return <Link to={`/topics/${topic.slug}/articles`} key={index}>{topic.title}
                    {'     |     '} </Link>
                else return <Link to={`/topics/${topic.slug}/articles`} key={index}>{topic.title} </Link>
              })}
            </nav>
          </div>
          {this.props.user.username ? <div className='logged-in'>
            <p>Current user: <Link to={`/users/${this.props.user.username}`}>{this.props.user.username}</Link></p>
            <button onClick={this.props.userLogout}>Log Out</button>
          </div> : <> </>}
        </>
    );
  }

  componentDidMount() {
    getData('', 'all')
      .then(topics => {
        this.setState({
          topics,
          loading: false
        })
      })
      .catch(console.log)
  }
}

export default Nav;