import React from 'react';
import propTypes from 'prop-types';
import { Link } from '@reach/router';

const ArticleAdder = ({ topic, handleSubmit, handleChange, changeTopic, showArticleAdder, handleChangeTitle }) => {
  return (
    <div>
      <label htmlFor='add-article'>Please complete all fields</label>
      <form className='add-article'>
        <select onChange={changeTopic} defaultValue='' name='topic' className='required'>
          <option value={topic}>Choose a topic...</option>
          <option value='coding' >Coding</option>
          <option value='football'>Football</option>
          <option value='cooking'>Cooking</option>
        </select>

        <input type='text' placeholder='Add an article title...' onChange={handleChangeTitle} name='title' className='required'/>

        <input type='text' placeholder='Type your article here...' onChange={handleChange} name='article' className='required' />

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