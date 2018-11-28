import { Link } from '@reach/router';
import React, { Component } from 'react';
import { getArticles, postArticle } from '../api';

class Articles extends Component {
  state = {
    articles: [],
    loading: true,
    newArticle: '',
    newArticleTitle: '',
    topic: '',
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

        <ul className='articles'>
          {this.state.articles.map(article => {
            let date = new Date(article.created_at)
            let day = date.getDay()
            let month = date.getMonth()
            let year = date.getFullYear()
            {
              if (this.state.loading) return <p>Loading...</p>
              return (
                <li key={article._id}>
                  <Link to={`/articles/${article._id}`}>{article.title}</Link>
                  <p>by {article.created_by.name}</p>
                  <p>Posted on: {day}/{month}/{year}</p>
                  <p>{article.body.substring(0, 160)}...</p>
                </li>
              )
            }
          })}
        </ul>
      </div>
    );
  }

  componentDidMount() {
    console.log('mounting')
    getArticles(this.props.topic_slug)
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
      getArticles(this.props.topic_slug)
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
}

export default Articles;