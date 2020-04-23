import React, { useState } from "react";

import "./SearchBar.css";

function SearchBar({ onChange, value }) {
  return (
    <form className="search-form" onSubmit={(e) => e.preventDefault()}>
      <label className="searchbar-label">
        Search Log:{" "}
        <select>
          <option>Name</option>
          <option>Tag</option>
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
