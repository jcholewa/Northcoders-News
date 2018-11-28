import React, { Component } from 'react';
import { alterVotes } from '../api';

class Votes extends Component {
  state = {
    votes: this.props.votes
  }

  render() {
    return (
      <div>
        Votes: {this.state.votes} <br />
        <button onClick={this.handleVote} value='up'>Upvote</button>
        <button onClick={this.handleVote} value='down'>Downvote</button>
      </div>
    );
  }

  handleVote = event => {
    console.log(event.target.value)
    alterVotes(this.props.id, event.target.value, this.props.work)
      .then(result => {
        this.setState({
          votes: result.votes
        })
      })
      .catch(console.log)
  }

}

export default Votes;