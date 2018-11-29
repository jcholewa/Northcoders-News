import React, { Component } from 'react';
import Articles from './Articles';
import User from './User';

class Home extends Component {
  state = {
    loading: true,
  }

  render() {
    console.log('rendering')
    return (
      this.state.loading === true ? <p>Loading...</p> :
        <div className="home">
          {this.props.topic_slug !== undefined ?
            <header>
              <h1>News about {this.props.topic_slug}</h1>
            </header> :
            <header>
              <h1>Northcoders News</h1>
            </header>}
          {this.props.username ? <User /> :
            <Articles user={this.props.user} topic_slug={this.props.topic_slug} />}
          <footer>Footer</footer>
        </div>
    );
  }

  componentDidMount() {
    console.log('mounting')
    this.setState({
      loading: false
    })
  }

}

export default Home;