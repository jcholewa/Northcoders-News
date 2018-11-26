import React from 'react';
import {Link} from '@reach/router';

const Nav = () => {
  return (
    <div className="nav">
      <nav>
        <Link to='/'>Home</Link>
        {'   |   '}
        <Link to='/topics'>Topics</Link>
      </nav>
    </div>
  );
};

export default Nav;