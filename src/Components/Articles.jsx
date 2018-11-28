import { Link } from '@reach/router';
import React, { Component } from 'react';
import Votes from './Votes';
import SortBy from './SortBy';
import { getData, postArticle } from '../api';
import { getDate } from '../utils';
const _ = require('underscore');

class Articles extends Component {
  state = {
    articles: [],
    loading: true,
    newArticle: '',
    newArticleTitle: '',
    topic: '',
    sortBy: ''
  }

  prevProps = this.props.prevProps;

  render() {
    return (
      <div>
        <form className='add-article'>
          <select onChange={this.changeTopic} defaultValue=''>
            <option value={this.state.topic}>Choose a topic...</option>
            <option value='coding'>Coding</option>
            <option value='football'>Football</option>
            <option value='cooking'>Cooking</option>
          </select>

          <input type='text' placeholder='Add an article title...' onChange={this.handleChangeTitle} value={this.state.newArticleTitle} />

          <input type='text' placeholder='Add an article...' onChange={this.handleChange} value={this.state.newArticle} />

          <button onClick={this.handleSubmit}>Add an article</button>
        </form>

        {this.state.loading ? <p>Loading...</p> :
          <>
            <SortBy handleChangeSort={this.handleChangeSort} handleSortBySubmit={this.handleSortBySubmit} value={'articles'} />
            <ul className='articles'>
              {this.state.articles.map(article => {
                let dayPosted = getDate(article.created_at)
                {
                  if (this.state.loading) return <p>Loading...</p>
                  return (
                    <li key={article._id}>
                      <Link to={`/articles/${article._id}`}>{article.title}</Link>
                      <p>by {article.created_by.name}</p>
                      <p>Posted on: {dayPosted}</p>
                      <p>{article.body.substring(0, 160)}...</p>
                      <Votes id={article._id} votes={article.votes} type='articles' />
                    </li>
                  )
                }
              })}
            </ul>
          </>}
      </div>
    )
  }

  componentDidMount() {
    console.log('mounting')
    getData('', this.props.topic_slug)
      .then(articles => {
        this.setState({
          articles,
          loading: false
        })
      })
      .catch(console.log)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.topic_slug !== this.props.topic_slug) {
      getData('', this.props.topic_slug)
        .then(articles => {
          this.setState({
            articles,
            loading: false
          })
        })
        .catch(console.log)
    }
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