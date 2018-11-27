import React from 'react';
import { Link } from '@reach/router';

const Comments = ({ comments }) => {
  return (
    <div>
      <h4>Comments</h4>
      <ul className='commentsList'>
        {comments.map(comment => {
          return <li className='commentsLI' key={comment._id}>{comment.body} <br />
            Votes: {comment.votes}
          </li>
        })}
      </ul>
    </div>
  );
};

export default Comments;