import React, { Component } from 'react';
import { alterVotes } from '../api';
import { alterVoteMod } from '../utils';

class Votes extends Component {
  state = {
    voteMod: 0,
    up: false,
    down: false
  }

  render() {
    return (
      this.state.err ? <p>Something went wrong</p> :
        <div className='votes'>
          {this.props.votes + this.state.voteMod} {this.props.votes === 1 ? ' vote ' : ' votes '}
          <button className={this.state.up && 'up'} onClick={(() => this.handleVote('up'))} disabled={this.state.voteMod === 1} ><i className="far fa-thumbs-up"></i></button>
          <button  onClick={(() => this.handleVote('down'))} disabled={this.state.voteMod === -1}><i className="far fa-thumbs-down"></i></button>
        </div>
    );
  }

  handleVote = (direction) => {
    // if (direction === 'up') {
    //   this.setState(state => {
    //     up: state.up === true ? false : true
    //   })
    // }
      
      // up.classList.toggle('up')
      // toggle green
    // } else if (direction === 'down') {
    //   // toggle red
    // }
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