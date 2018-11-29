import React, { Component } from 'react';
import { getUser, getArticlesForUser } from '../api';
import { getDate } from '../utils';
import Votes from '../Components/Votes';
import { Link } from '@reach/router';


class User extends Component {

  state = {
    user: {},
    loading: true,
    userArticles: [],
    showArticles: false
  }

  render() {
    return (
      this.state.loading ? <p>Loading...</p> :
        <div>
          <img src={this.state.user.avatar_url} alt="user's avatar"></img>
          <p>Username: {this.state.user.username}</p>
          <p>Name: {this.state.user.name}</p>
          {this.state.showArticles ?
            <section>
              <h4>Articles by {this.state.user.username}:</h4>
              <ul>
                {this.state.userArticles.map(article => {
                  {
                    return (
                      <div className='user-articles'>
                        <Link to={`/articles/${article._id}`}>{article.title}</Link>
                      </div>
                    )
                  }
                })}
              </ul>
            </section> : <button onClick={this.displayArticles}>View articles by {this.state.user.username}</button>}
          <br />
          <Link to={'/'}>Back to Home</Link>
        </div>
    );
  }

  componentDidMount() {
    getUser(this.props.username)
      .then(user => {
        this.setState({
          user,
          loading: false
        })
      })
      .then(() => {
        getArticlesForUser(this.state.user.username)
          .then(articles => {
            this.setState({
              userArticles: articles
            })
          })
      })
      .catch(console.log)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.username !== this.props.username) {
      getUser(this.props.username)
        .then(user => {
          this.setState({
            user,
            loading: false
          })
        })
        .catch(console.log)
    }
  }

  displayArticles = () => {
    this.setState({
      showArticles: true
    })
  }
}


export default User;