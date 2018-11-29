import React, { Component } from 'react';
import { getUser } from '../api';

class User extends Component {

  state = {
    user: {},
    loading: true
  }

  render() {
    console.log(this.props.articles)
    return (
      this.state.loading ? <p>Loading...</p> :
        <div>
          <img src={this.state.user.avatar_url} alt="user's avatar"></img>
          <p>Username: {this.state.user.username}</p>
          <p>Name: {this.state.user.name}</p>
          <section>
            <ul>
              {/* {this.props.articles.filter(article => {
                console.log(article.created_by)
                return <li>Article by user</li>
              })} */}
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