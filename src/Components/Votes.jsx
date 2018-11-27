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
    alterVotes(this.props.id, event.value)
      .then(comment => {
        this.setState({
          votes: comment.votes
        })
      })
      .catch(console.log)
  }

}

export default Votes;