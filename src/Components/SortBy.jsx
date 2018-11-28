import React from 'react';

const SortBy = () => {
  return (
    <div>
      <form >
        <label for='sort-select'>Sort articles by: </label>
        <select id='sort-select'>
          <option>Choose a filter...</option>
          <option value='votes'>Number of votes</option>
          <option value='time'>Time posted</option>
        </select>
      </form>
    </div>
  );
};

export default SortBy;