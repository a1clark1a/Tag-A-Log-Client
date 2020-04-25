import React from "react";

import "./DisplayTagList.css";

const DisplayTagList = ({ tag, currentPage, onDelete }) => {
  return (
    <div className="log-wrapper log">
      <h3 className="log-name log">{tag.tag_name}</h3>
      {currentPage !== "dash" && (
        <button className="log-delete log" onClick={() => onDelete(tag.id)}>
          X
        </button>
      )}
    </div>
  );
};

export default DisplayTagList;
