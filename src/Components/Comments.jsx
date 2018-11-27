import React from 'react';

const Comments = ({ comments }) => {
  return (
    <div>
      <h4>Comments</h4>
      <ul className='commentsList'>
        {comments.map(comment => {
          return <li className='commentsLI' key={comment._id}>{comment.body} <br />
            Votes: {comment.votes} <br/>
            <button>Upvote</button> <button>Downvote</button>
          </li>
        })}
      </ul>
    </div>
  );
};

export default Comments;