import React, { Component } from 'react';
import Articles from './Articles';
import { getArticles, postArticle } from '../api';

class Home extends Component {
  state = {
    articles: [],
    loading: true,
    newArticle: '',
    newArticleTitle: ''
  }

  render() {
    console.log('rendering')
    return (
      this.state.loading === true ? <p>Loading...</p> :
        <div className="home">
          <header>
            <h1>Northcoders News</h1>
          </header>
          <Articles articles={this.state.articles} newArticle={this.state.newArticle} handleChange={this.handleChange} handleChangeTitle={this.handleChangeTitle} handleSubmit={this.handleSubmit} />
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

  handleSubmit = (event) => {
    event.preventDefault()
    console.log('add article clicked')
    postArticle(this.state.newArticleTitle, this.state.newArticle, this.state.articles.belongs_to)
      .then(article => {
        this.setState(state => {
          return { articles: [article, ...state.articles] }
        })
      })
      .then(() => {
        this.setState({
          newArticle: ''
        })
      })
  }


}

export default Home;