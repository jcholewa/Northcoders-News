import React from "react";
import { Link } from "@reach/router";
import '../styles/BadRequest.css'

const BadRequest = props => {
  return (
    <div className='bad-request'>
      <h1>{props.location.state.code} Bad Request</h1>
      <p>{props.location.state.message}</p>
      <Link to={"/"}>Back to Home</Link>
    </div>
  );
};

export default BadRequest;
