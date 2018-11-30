import React from "react";
import { Link } from "@reach/router";

const BadRequest = props => {
  return (
    <div>
      <h1>{props.location.state.code} Bad Request</h1>
      <p>{props.location.state.message}</p>
      <Link to={"/"}>Back to Home</Link>
    </div>
  );
};

export default BadRequest;
