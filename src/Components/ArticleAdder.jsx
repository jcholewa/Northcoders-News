import React from "react";
import propTypes from "prop-types";
import { Link } from "@reach/router";

const ArticleAdder = ({
  topic,
  handleSubmit,
  handleChange,
  changeTopic,
  showArticleAdder,
  handleChangeTitle,
  completed
}) => {
  return (
    <div className='add-article'>
      {completed === false && <p className='missing-fields'>Please complete all fields</p>}
      <form className="add-article-form">
        <select
          className='topic-dropdown'
          onChange={changeTopic}
          defaultValue=""
          name="topic"
        >
          <option value={topic}>Choose a topic...</option>
          <option value="coding">Coding</option>
          <option value="football">Football</option>
          <option value="cooking">Cooking</option>
        </select>

        <input
          aria-label="Add title"
          type="text"
          placeholder="Add an article title..."
          onChange={handleChangeTitle}
          name="title"
        />

        <textarea
          id='input-body'
          aria-label="Add article body"
          placeholder="Type your article here..."
          onChange={handleChange}
          name="article"></textarea>
        

        <button className='post-article-button' onClick={handleSubmit}>Post article</button>
      </form>
      <Link to={"/articles"} onClick={showArticleAdder}>
        Back to Home
      </Link>
    </div>
  );
};

ArticleAdder.propTypes = {
  handleChange: propTypes.func.isRequired,
  handleSubmit: propTypes.func.isRequired,
  showArticleAdder: propTypes.func.isRequired
};

export default ArticleAdder;
