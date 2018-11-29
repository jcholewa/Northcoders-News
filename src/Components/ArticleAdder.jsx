import React from 'react';
import propTypes from 'prop-types';
import { Link } from '@reach/router';

const ArticleAdder = ({ topic, title, article, handleSubmit, handleChange, changeTopic, showArticleAdder, handleChangeTitle }) => {
  return (
    <div>
      <form className='add-article'>
        <select onChange={changeTopic} defaultValue='' name='topic'>
          <option value={topic}>Choose a topic...</option>
          <option value='coding' >Coding</option>
          <option value='football'>Football</option>
          <option value='cooking'>Cooking</option>
        </select>

        <input type='text' placeholder='Add an article title...' onChange={handleChangeTitle} name='title' />

        <input type='text' placeholder='Add an article...' onChange={handleChange} name='article' />

        <button onClick={handleSubmit}>Post article</button>
      </form>
      <Link to={'/'} onClick={showArticleAdder}>Back to Home</Link>
    </div>
  );
};

ArticleAdder.propTypes = {
  handleChange: propTypes.func.isRequired,
  handleSubmit: propTypes.func.isRequired,
  showArticleAdder: propTypes.func.isRequired,
  topic: propTypes.string,
  title: propTypes.string.isRequired,
  article: propTypes.string.isRequired
}

export default ArticleAdder;