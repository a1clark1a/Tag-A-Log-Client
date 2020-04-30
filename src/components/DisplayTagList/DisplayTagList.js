import React from "react";

import Tag from "../Tag/Tag";

import "./DisplayTagList.css";

const DisplayTagList = ({ tag, currentPage, onDelete }) => {
  return (
    <div className="tag-wrapper tag">
      <Tag tag_name={tag.tag_name} currentPage={currentPage} />
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
