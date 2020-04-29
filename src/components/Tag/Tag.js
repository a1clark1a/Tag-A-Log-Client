import React from "react";

import "./Tag.css";

const Tag = ({ tag_name, onDeleteTag, currentPage, color }) => {
  return (
    <div className={`tag-box tag ${color}`}>
      <h3 className="tag">{tag_name}</h3>
      {currentPage === undefined && (
        <button
          type="button"
          className="tag-delete tag"
          aria-label="delete"
          onClick={onDeleteTag}
        >
          X
        </button>
      )}
    </div>
  );
};

export default Tag;
