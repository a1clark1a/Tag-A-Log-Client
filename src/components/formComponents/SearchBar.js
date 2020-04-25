import React, { useState } from "react";

import "./SearchBar.css";

function SearchBar({ onChange, value, onSelect, searchType }) {
  return (
    <form className="search-form" onSubmit={(e) => e.preventDefault()}>
      <label className="searchbar-label">
        Search Log:{" "}
        <select onChange={onSelect} value={searchType}>
          <option value="name">Name</option>
          <option value="tag">Tag</option>
        </select>
      </label>
      <input
        type="text"
        className="search-input"
        onChange={onChange}
        value={value}
      />
    </form>
  );
}

export default SearchBar;
