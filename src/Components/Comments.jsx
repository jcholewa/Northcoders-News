import React from 'react';
import { Link } from '@reach/router';

const Comments = ({ comments, article }) => {
  return (
    <div>
      <Link to='/articles/:article_id'>Back to article</Link>
      <h4>Comments for {article.title}</h4>
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