import React, { useState } from "react";

import "./SearchBar.css";

function SearchBar({ onChange, onKeyDown, value }) {
  return (
    <form className="search-form">
      <label className="searchbar-label">
        Search Log:{" "}
        <select>
          <option>Name</option>
          <option>Tag</option>
        </select>
      </label>
      <input
        type="Search"
        className="search-input"
        onChange={onChange}
        onKeyDown={onKeyDown}
        value={value}
      />
    </form>
  );
}

export default SearchBar;
