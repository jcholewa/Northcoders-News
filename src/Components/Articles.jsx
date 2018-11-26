import React from 'react';
import { Link } from '@reach/router';

const Articles = ({ articles }) => {
  return (
    <div className='articles'>
      <button>Add an article</button>
      <ul>
        {articles.map(article => {
          return (
            <li key={article._id}>
              <Link to={`/articles/${article._id}`}>{article.title}</Link>
            </li>
          )
        })}
      </ul>
    </div>
  );
};

export default Articles;