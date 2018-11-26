import React from 'react';
import {Link} from '@reach/router';

const Comments = () => {
  return (
    <div>
      <Link to='/articles/:article_id'>Back to article</Link>
      <h2>Comments for [Article Name]</h2>
      <button>Add a comment</button>
      <p>Comment count</p>
      <p>Comment 1</p>
      <p>Comment 2</p>
      <p>Comment 3</p>
    </div>
  );
};

export default Comments;