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
    if (this.props.topic_slug !== undefined) return <header>
      <h1>News about {this.props.topic_slug}</h1>
    </header>
    return (
      <div id='top' className="home">
        <Articles user={this.props.user} articles={this.state.articles} />
      </div>
    );
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
            loading: false,
          })
        })
        .catch(console.log)
    }
  }

}

export default Home;