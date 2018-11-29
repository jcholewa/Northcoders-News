import { Link, navigate } from '@reach/router';
import React, { Component } from 'react';
import Votes from './Votes';
import SortBy from './SortBy';
import ArticleAdder from './ArticleAdder';
import Loading from './Loading';
import { postArticle } from '../api';
import { getDate } from '../utils';
const _ = require('underscore');

class Articles extends Component {
  state = {
    articles: [],
    loading: true,
    article: '',
    title: '',
    topic: '',
    sortBy: '',
    addArticle: false,
    searchTerm: ''
  }

  prevProps = this.props.prevProps;

  render() {
    const articles = this.state.articles.filter(article => article.body.toLowerCase().includes(this.state.searchTerm.toLowerCase()) || article.title.toLowerCase().includes(this.state.searchTerm.toLowerCase())) || this.state.articles;

    if (this.state.loading) return <Loading />
    if (this.state.err) return <p>{this.state.err}</p>

    return (
      <div>
        <>
          <input type='text' placeholder='Search for articles..' onChange={this.onSearchChange} value={this.state.searchTerm} /><button onClick={this.onSearchSubmit}>Search</button><br />
          {this.state.addArticle ?
            <ArticleAdder topic={this.state.topic} title={this.state.title} article={this.state.article} handleSubmit={this.handleSubmit} handleChange={this.handleChange} showArticleAdder={this.showArticleAdder} changeTopic={this.changeTopic} handleChangeTitle={this.handleChangeTitle} /> :
            <>
              <button onClick={this.showArticleAdder}>Click here to add an article</button>
              <SortBy handleChangeSort={this.handleChangeSort} handleSortBySubmit={this.handleSortBySubmit} value={'articles'} />
              <ul className='articles'>
                {articles.map(article => {
                  let dayPosted = getDate(article.created_at)
                  {
                    if (this.state.loading) return <p>Loading...</p>
                    return (
                      <li key={article._id}>
                        <Link to={`/articles/${article._id}`}>{article.title}</Link>
                        by <Link to={`/users/${article.created_by.username}`}> {article.created_by.username}</Link>
                        <p>Posted on: {dayPosted}</p>
                        <p>{article.body.substring(0, 160)}...</p>
                        <Votes id={article._id} votes={article.votes} type='articles' />
                      </li>
                    )
                  }
                })}
              </ul>
              <a href='#top'>Back to Top</a>
            </>}
        </>
      </div>
    )
  }

  componentDidMount() {
    console.log('mounting')
    this.setState({
      loading: false,
      articles: this.props.articles
    })
  }

  showArticleAdder = event => {
    event.preventDefault();
    this.setState(state => {
      return { addArticle: state.addArticle === true ? false : true }
    })
  }

  onSearchChange = event => {
    this.setState({
      searchTerm: event.target.value,
    })
  }

  onSearchSubmit = event => {
    event.preventDefault();

  }

  handleChange = event => {
    this.setState({
      article: event.target.value
    })
  }

  handleChangeTitle = event => {
    this.setState({
      title: event.target.value
    })
  }

  changeTopic = event => {
    this.setState({
      topic: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    postArticle(this.state.title, this.state.article, this.state.topic, this.props.user._id)
      .then(article => {
        this.setState(state => {
          return { articles: [article, ...state.articles] }
        })
      })
      .then(() => {
        this.setState({
          article: '',
          title: '',
          topic: null,
          addArticle: false
        })
      })
      .catch(err => {
        navigate('/error', {
          replace: true, state: {
            code: err.response.status,
          }
        })
      })
  }

  // This will be the onChange for the select element:
  handleChangeSort = event => {
    this.setState({
      sortBy: event.target.value
    })
  }

  // This will be the onClick for the whole form element:
  handleSortBySubmit = (event) => {
    event.preventDefault();
    this.setState(state => {
      return {
        articles: state.sortBy.includes('votes') ? state.sortBy === 'votes-desc' ? _.sortBy(state.articles, 'votes').reverse() : _.sortBy(state.articles, 'votes') : state.sortBy === 'time-desc' ? _.sortBy(state.articles, 'created_at').reverse() : _.sortBy(state.articles, 'created_at')
      }
    })
  }

}

export default Articles;