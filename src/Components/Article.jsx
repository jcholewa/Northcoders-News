import React, { Component } from 'react';
import { getData } from '../api';
import { Link } from '@reach/router';
import '../Comments.css'
import Comments from './Comments';
import Votes from './Votes';

class Article extends Component {
  state = {
    article: [],
    loading: true,
    showComments: false,
  }

  render() {
    return (
      this.state.loading === true ? <p>Loading...</p> :
        <div>
          <h1>{this.state.article.title}</h1>
          Author: <Link to={`/users/${this.state.article.created_by.username}`}> {this.state.article.created_by.username}</Link>
          <h4>Topic: {this.state.article.belongs_to}</h4>
          <p>{this.state.article.body}</p>

          <Votes id={this.state.article._id} votes={this.state.article.votes} type='articles' />

          {this.state.showComments ?
            <Comments article_id={this.state.article._id} comment={this.state.comment} user={this.props.user} /> :
            <button onClick={this.displayComments}>View {this.state.article.comment_count} comments</button>}
          <br />
          <Link to={'/'}>Back to Home</Link>

        </div >
    );
  }

  componentDidMount() {
    console.log('mounting');
    getData(this.props.article_id)
      .then(article => {
        this.setState({
          article,
          loading: false
        })
      })
      .catch(console.log)
  }

  displayComments = () => {
    this.setState({
      showComments: true
    })
  }

}

export default Article;