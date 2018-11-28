import React, { Component } from 'react';
import { alterVotes } from '../api';

class Votes extends Component {
  state = {
    voteMod: 0
  }

  render() {
    return (
      <div>
        Votes: {this.props.votes + this.state.voteMod} <br />
        <button onClick={(() => this.handleVote('up'))} >Upvote</button>
        <button onClick={(() => this.handleVote('down'))} >Downvote</button>
      </div>
    );
  }

  handleVote = (direction) => {
    alterVotes(this.props.id, direction, this.props.type)
      .catch(err => { this.setState({ err }) })
    this.setState(state => {
      return {
        voteMod: direction === 'up' ? 1 : -1
      }
    })
  }

}

export default Votes;