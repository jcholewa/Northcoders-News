import React from 'react';
import { Link } from '@reach/router';

const BadRequest = (props) => {
  return (
    <div>
      <h1>{props.location.code} Bad Request</h1>
      <Link to={'/'}>Back to Home</Link>
    </div>
  );
};

export default BadRequest;