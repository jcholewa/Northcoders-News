import React from 'react';
import { Link } from '@reach/router';

const Articles = ({ articles, newArticle, newArticleTitle, handleSubmit, handleChange, handleChangeTitle }) => {
  return (
    <div className='articles'>
      <input type='text' placeholder='Add an article title...' onChange={handleChangeTitle} value={newArticleTitle} />
      <input type='text' placeholder='Add an article...' onChange={handleChange} value={newArticle} />
      <button onClick={handleSubmit}>Add an article</button>
      <ul>
        {articles.map(article => {
          return (
            <li key={article._id}>
              <Link to={`/articles/${article._id}`}>{article.title}</Link>
              <p>by {article.created_by.name}</p>
              <p>{article.body.substring(0, 160)}...</p>
            </li>
          )
        })}
      </ul>
    </div>
  );
};

export default Articles;