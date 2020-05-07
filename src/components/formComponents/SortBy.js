import React from "react";

import InfoToolTip from "../formComponents/InfoToolTip";

import "./SortBy.css";

const SortBy = ({ onSelect, sortBy }) => {
  return (
    <label className="sort-by-label label-alignment">
      <h4>Sort by:</h4>
      <select onChange={onSelect} value={sortBy}>
        <option className="option" value="descending">
          Date: First
        </option>
        <option className="option" value="ascending">
          Date: Latest
        </option>
      </select>
      <InfoToolTip
        text={
          "Sort the list by which log was created first or by the most recent one created"
        }
      />
    </label>
  );
};

export default SortBy;
