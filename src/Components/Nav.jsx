import { Link } from '@reach/router';
import React, { Component } from 'react';
import { getData } from '../api';
import Loading from './Loading';

class Nav extends Component {
  state = {
    topics: [],
    loading: true,
    articles: []
  }

  render() {
    if (this.state.loading) return <Loading />
    return (
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
            {this.props.user.username ? <div className='logged-in'>
              <Link to={`/users/${this.props.user.username}`}>Current user: {this.props.user.username}</Link>
              <button onClick={this.props.userLogout}>Log Out</button>
            </div> : <> </>}
          </nav>
        </div>
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