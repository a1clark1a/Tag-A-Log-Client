import React from "react";

const SortBy = ({ onSelect, sortBy }) => {
  return (
    <label className="sort-by-label">
      Sort by:{" "}
      <select onChange={onSelect} value={sortBy}>
        <option value="descending">Date: First</option>
        <option value="ascending">Date: Latest</option>
      </select>
    </label>
  );
};

export default SortBy;
