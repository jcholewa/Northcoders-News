import React from 'react';

const SortBy = ({ handleChangeSort, handleSortBySubmit, value }) => {
  return (
    <div>
      <form >
        <label htmlFor='sort-select'>Sort {value} by: </label>
        <select id='sort-select' onChange={handleChangeSort} defaultValue=''>
          <option>Choose a filter...</option>
          <option value='votes'>Number of votes descending</option>
          <option value='time'>Time posted, newest-oldest</option>
        </select>
        <button onClick={handleSortBySubmit}>Sort</button>
      </form>
    </div>
  );

};

export default SortBy;