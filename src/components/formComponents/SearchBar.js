import React from "react";

import "./SearchBar.css";

function SearchBar() {
  return (
    <form className="search-form">
      <label>
        Search Log:{" "}
        <select>
          <option>Search By</option>
          <option>Tag</option>
          <option>Name</option>
        </select>
      </label>
      <input type="Search" />
      <input type="text" value="AutoSuggestion here" />
    </form>
  );
}

export default SearchBar;
