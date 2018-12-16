import React, { Component } from "react";
import { alterVotes } from "../api";
import { alterVoteMod } from "../utils";
import propTypes from "prop-types";

class Votes extends Component {
  state = {
    voteMod: 0,
    up: false,
    down: false,
    upClicked: false,
    downClicked: false
  };

  render() {
    const { err, voteMod, up, down } = this.state;

    return err ? (
      <p>Something went wrong</p>
    ) : (
      <div className="votes">
        {this.props.votes + voteMod} {" votes "}
        <button
          aria-label="upvote"
          className={up ? "up" : "neutral"}
          onClick={() => this.handleVote("up")}
          disabled={voteMod === 1}
        >
          <i className="far fa-thumbs-up" />
        </button>
        <button
          aria-label="downvote"
          className={down ? "down" : "netural"}
          onClick={() => this.handleVote("down")}
          disabled={voteMod === -1}
        >
          <i className="far fa-thumbs-down" />
        </button>
      </div>
    );
  }

  handleVote = direction => {
    alterVotes(this.props.id, direction, this.props.type).catch(err => {
      this.setState({ err });
    });
    this.setState(state => {
      return {
        voteMod: alterVoteMod(state.voteMod, direction),
        [direction]: this.state[direction] ? false : true,
      };
    });
  };
}

Votes.propTypes = {
  votes: propTypes.number.isRequired,
  id: propTypes.string.isRequired,
  type: propTypes.string.isRequired
};

export default Votes;