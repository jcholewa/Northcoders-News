import React, { Component } from 'react';
import { getUser, getArticlesForUser } from '../api';
import {getDate} from '../utils';
import Votes from '../Components/Votes';
import {Link} from '@reach/router';


class User extends Component {

  state = {
    user: {},
    loading: true,
    userArticles: []
  }

  render() {
    return (
      this.state.loading ? <p>Loading...</p> :
        <div>
          <img src={this.state.user.avatar_url} alt="user's avatar"></img>
          <p>Username: {this.state.user.username}</p>
          <p>Name: {this.state.user.name}</p>
          <section>
            <ul>
              {this.state.userArticles.map(article => {
                let dayPosted = getDate(article.created_at)
                {
                  if (this.state.loading) return <p>Loading...</p>
                  return (
                    <li key={article._id}>
                      <Link to={`/articles/${article._id}`}>{article.title}</Link>
                      <p>by <Link to={`/users/${article.created_by.username}`}> {article.created_by.username}</Link></p>
                      <p>Posted on: {dayPosted}</p>
                      <p>{article.body.substring(0, 160)}...</p>
                      <Votes id={article._id} votes={article.votes} type='articles' />
                    </li>
                  )
                }
              })}
            </ul>
          </section>
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
}


export default User;