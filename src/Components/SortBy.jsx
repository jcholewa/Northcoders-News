import React from 'react';

const SortBy = ({ handleChangeSort, handleSortBySubmit }) => {
  return (
    <div>
      <form >
        <label htmlFor='sort-select'>Sort articles by: </label>
        <select id='sort-select' onChange={handleChangeSort} defaultValue=''>
          <option>Choose a filter...</option>
          <option value='votes'>Number of votes</option>
          <option value='time'>Time posted</option>
        </select>
        <button onClick={handleSortBySubmit}>Sort</button>
      </form>
    </div>
  );

};

export default SortBy;