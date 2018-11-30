import React from 'react';
import propTypes from 'prop-types';

const SortBy = ({ handleChangeSort, handleSortBySubmit, value }) => {
  return (
    <div className='sort-by'>
      <form >
        <label htmlFor='sort-select'>Sort {value} by:</label>
        <select id='sort-select' onChange={handleChangeSort} defaultValue=''>
          <option>Choose a filter...</option>
          <option value='votes-desc'>Number of votes descending</option>
          <option value='votes-asc'>Number of votes ascending</option>
          <option value='time-desc'>Time posted, newest-oldest</option>
          <option value='time-asc'>Time posted, oldest-newest</option>
        </select>
        <button onClick={handleSortBySubmit}>Sort</button>
      </form>
    </div>
  );

};

SortBy.propTypes = {
  handleChangeSort: propTypes.func.isRequired,
  handleSortBySubmit: propTypes.func.isRequired
}

export default SortBy;