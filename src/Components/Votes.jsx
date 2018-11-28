import React, { Component } from 'react';
import { alterVotes } from '../api';
import { alterVoteMod } from '../utils';

class Votes extends Component {
  state = {
    voteMod: 0
  }

  render() {
    return (
      this.state.err ? <p>Something went wrong</p> :
        <div>
          Votes: {this.props.votes + this.state.voteMod} <br />
          <button onClick={(() => this.handleVote('up'))} disabled={this.state.voteMod === 1} >Upvote</button>
          <button onClick={(() => this.handleVote('down'))} disabled={this.state.voteMod === -1}>Downvote</button>
        </div>
    );
  }

  handleVote = (direction) => {
    alterVotes(this.props.id, direction, this.props.type)
      .catch(err => { this.setState({ err }) })
    this.setState(state => {
      return {
        voteMod: alterVoteMod(state.voteMod, direction)
      }
    })
  }

}

export default Votes;