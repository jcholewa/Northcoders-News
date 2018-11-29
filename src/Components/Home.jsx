import React, { Component } from 'react';
import Articles from './Articles';
import Loading from './Loading';
import { getData } from '../api';

class Home extends Component {
  state = {
    articles: [],
    loading: true,
  }

  prevProps = this.props.prevProps;

  render() {
    console.log('rendering')
    if (this.state.loading) return <Loading />
    return (
      <div id='top' className="home">
        {this.props.topic_slug !== undefined ?
          <header>
            <h1>News about {this.props.topic_slug}</h1>
          </header> :
          <header>
            <h1>Northcoders News</h1>
          </header>}
        <Articles user={this.props.user} articles={this.state.articles} />
        <footer>Footer</footer>
      </div>
    );
  }

  componentDidMount() {
    console.log('mounting')
    console.log('in home', this.props)
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
            loading: false,
          })
        })
        .catch(console.log)
    }
  }

}

export default Home;