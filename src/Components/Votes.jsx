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
        <div className='votes'>
          {this.props.votes + this.state.voteMod} {this.props.votes === 1 ? ' vote ' : ' votes '}
          <button onClick={(() => this.handleVote('up'))} disabled={this.state.voteMod === 1} ><i className="far fa-thumbs-up"></i></button>
          <button onClick={(() => this.handleVote('down'))} disabled={this.state.voteMod === -1}><i className="far fa-thumbs-down"></i></button>
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