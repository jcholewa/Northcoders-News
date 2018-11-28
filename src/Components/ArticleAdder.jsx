import React from 'react';
import propTypes from 'prop-types';
import { Link } from '@reach/router';

const ArticleAdder = ({ changeTopic, topic, handleChangeTitle, newArticleTitle, newArticle, handleSubmit, handleChange, showArticleAdder }) => {
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

        <button onClick={handleSubmit}>Post article</button>
      </form>
      <Link to={'/'} onClick={showArticleAdder}>Back to Home</Link>
    </div>
  );
};

ArticleAdder.propTypes = {
  changeTopic: propTypes.func.isRequired,
  handleChangeTitle: propTypes.func.isRequired,
  handleChange: propTypes.func.isRequired,
  handleSubmit: propTypes.func.isRequired,
  showArticleAdder: propTypes.func.isRequired,
  topic: propTypes.string.isRequired,
  newArticleTitle: propTypes.string.isRequired,
  newArticle: propTypes.string.isRequired
}

export default ArticleAdder;