import React from 'react';
import { Link } from '@reach/router';

const Articles = ({ articles, newArticle, newArticleTitle, handleSubmit, handleChange, handleChangeTitle, changeTopic, topic }) => {
  return (
    <div>
      <form className='add-article'>
        <select onChange={changeTopic} defaultValue=''>
          <option value={topic}>Choose a topic...</option>
          <option value='coding'>Coding</option>
          <option value='football'>Football</option>
          <option value='cooking'>Cooking</option>
        </select>

        <input type='text' placeholder='Add an article title...' onChange={handleChangeTitle} value={newArticleTitle} />

        <input type='text' placeholder='Add an article...' onChange={handleChange} value={newArticle} />

        <button onClick={handleSubmit}>Add an article</button>
      </form>

      <ul className='articles'>
        {articles.map(article => {
          let date = new Date(article.created_at)
          let day = date.getDay()
          let month = date.getMonth()
          let year = date.getFullYear()
          return (
            <li key={article._id}>
              <Link to={`/articles/${article._id}`}>{article.title}</Link>
              <p>by {article.created_by.name}</p>
              <p>Posted on: {day}/{month}/{year}</p>
              <p>{article.body.substring(0, 160)}...</p>
            </li>
          )
        })}
      </ul>
    </div>
  );
};

export default Articles;