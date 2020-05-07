import React from "react";

import InfoToolTip from "../formComponents/InfoToolTip";

import "./SearchBar.css";

function SearchBar({ onChange, value, onSelect, searchType }) {
  return (
    <form className="search-form" onSubmit={(e) => e.preventDefault()}>
      <label className="searchbar-label">
        <h1 className="search-h1">Search Log:</h1>
        <select
          className="search-select"
          onChange={onSelect}
          value={searchType}
        >
          <option value="name">Name</option>
          <option value="tag">Tag</option>
        </select>
        <InfoToolTip text={"Find your Logs either by Tags or the Log's Name"} />
      </label>
      <div className="search-box">
        <input
          type="text"
          className="search-input"
          onChange={onChange}
          value={value}
        ></input>
        <InfoToolTip
          text={
            "Type either the name of the Log or a Tag Name based on the selection made "
          }
        />
      </div>
    </form>
  );
}

export default SearchBar;
