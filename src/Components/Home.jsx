import React, { Component } from 'react';
import Articles from './Articles';
import { getArticles, postArticle } from '../api';

class Home extends Component {
  state = {
    articles: [],
    loading: true,
    newArticle: '',
    newArticleTitle: '',
    topic: ''
  }

  render() {
    console.log('rendering')
    return (
      this.state.loading === true ? <p>Loading...</p> :
        <div className="home">
          <header>
            <h1>Northcoders News</h1>
          </header>
          <Articles articles={this.state.articles} newArticle={this.state.newArticle} newArticleTitle={this.state.newArticleTitle} topic={this.state.topic} handleChange={this.handleChange} handleChangeTitle={this.handleChangeTitle} handleSubmit={this.handleSubmit} changeTopic={this.changeTopic} />
          <footer>Footer</footer>
        </div>
    );
  }

  componentDidMount() {
    console.log('mounting')
    getArticles()
      .then(articles => {
        this.setState({
          articles,
          loading: false
        })
      })
      .catch(console.log)
  }

  handleChange = event => {
    this.setState({
      newArticle: event.target.value
    })
  }

  handleChangeTitle = event => {
    this.setState({
      newArticleTitle: event.target.value
    })
  }

  changeTopic = event => {
    this.setState({
      topic: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    postArticle(this.state.newArticleTitle, this.state.newArticle, this.state.topic, this.props.user._id)
      .then(article => {
        this.setState(state => {
          return { articles: [article, ...state.articles] }
        })
      })
      .then(() => {
        this.setState({
          newArticle: '',
          newArticleTitle: '',
          topic: null
        })
      })
      .catch(console.log)
  }
}

export default Home;