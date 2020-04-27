import React from "react";

const Filter = ({ searchTerm, handleSearch }) => {
  return (
    <div>
      <h2>Search the book</h2>
      <input name="search" value={searchTerm} onChange={handleSearch}></input>
    </div>
  );
};

export default Filter;
