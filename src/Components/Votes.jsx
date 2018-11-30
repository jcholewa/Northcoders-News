import React, { Component } from "react";
import { alterVotes } from "../api";
import { alterVoteMod } from "../utils";

class Votes extends Component {
  state = {
    voteMod: 0,
    up: false,
    down: false,
    upClicked: false,
    downClicked: false
  };

  render() {
    return this.state.err ? (
      <p>Something went wrong</p>
    ) : (
      <div className="votes">
        {this.props.votes + this.state.voteMod} {" votes "}
        <button
          aria-label="upvote"
          className={this.state.up && this.state.upClicked ? "up" : "neutral"}
          onClick={() => this.handleVote("up")}
          disabled={this.state.voteMod === 1}
        >
          <i className="far fa-thumbs-up" />
        </button>
        <button
          aria-label="downvote"
          className={
            this.state.down && this.state.downClicked ? "down" : "netural"
          }
          onClick={() => this.handleVote("down")}
          disabled={this.state.voteMod === -1}
        >
          <i className="far fa-thumbs-down" />
        </button>
      </div>
    );
  }

  handleVote = direction => {
    const clicked = `${direction}Clicked`;
    alterVotes(this.props.id, direction, this.props.type).catch(err => {
      this.setState({ err });
    });
    this.setState(state => {
      return {
        voteMod: alterVoteMod(state.voteMod, direction),
        [direction]: this.state[direction] ? false : true,
        [clicked]: this.state[clicked] ? false : true
      };
    });
  };
}

export default Votes;
