import React from 'react';
import { Link } from '@reach/router';

const NotFound = () => {
  return (
    <div>
      <h1>Nothing to see here</h1>
      {/* add image? */}
      <Link to={'/'}>Back to Home</Link>
    </div>
  );
};

export default NotFound;