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
          <h2 className='nc-news'>Northcoders News</h2>
          <ul className='nav-ul'>
            <li className='nav-li'><Link className='link' to='/'>Home</Link></li>
            {this.state.topics.map((topic, index) => {
              return <li className='nav-li'><Link className='link' to={`/topics/${topic.slug}/articles`} key={index}>{topic.title} </Link></li>
            })}
          </ul>
          {this.props.user.username ? <div className='logged-in'>
            <li ><Link  to={`/users/${this.props.user.username}`}>Current user: {this.props.user.username}</Link>
              <button onClick={this.props.userLogout}>Log Out</button> </li>
          </div> : <> </>}
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