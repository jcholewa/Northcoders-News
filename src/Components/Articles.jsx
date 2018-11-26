import React from 'react';

const Articles = ({ articles }) => {
  return (
    <div className='articles'>
      <button>Add an article</button>
      <ul>
        {articles.map(article => {
          return (
            <li key={article._id}>
              <h3>{article.title}</h3>
            </li>
          )
        })}
      </ul>
    </div>
  );
};

export default Articles;