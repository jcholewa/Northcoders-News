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
        <button onClick={(() => this.handleVote('up'))} >Upvote</button>
        <button onClick={(() => this.handleVote('down'))} >Downvote</button>
      </div>
    );
  }

  handleVote = (direction) => {
    console.log(direction)
    alterVotes(this.props.id, direction, this.props.type)
      .then(result => {
        this.setState({
          votes: result.votes
        })
      })
      .catch(console.log)
  }

}

export default Votes;