import React from "react";

import "./DisplayTagList.css";

const DisplayTagList = ({ tag, currentPage, onDelete }) => {
  return (
    <div className="tag-wrapper tag">
      <h3 className="tag-name tag">{tag.tag_name}</h3>
      <code>{tag.date_created}</code>

      {currentPage !== "dash" && (
        <button
          className="tag-delete tag"
          aria-label="delete"
          onClick={() => onDelete(tag.id)}
        >
          X
        </button>
      )}
    </div>
  );
};

export default DisplayTagList;
