import React from "react";

import "./SortBy.css";

const SortBy = ({ onSelect, sortBy }) => {
  return (
    <label className="sort-by-label">
      <h4>Sort by:</h4>
      <select onChange={onSelect} value={sortBy}>
        <option className="option" value="descending">
          Date: First
        </option>
        <option className="option" value="ascending">
          Date: Latest
        </option>
      </select>
    </label>
  );
};

export default SortBy;
