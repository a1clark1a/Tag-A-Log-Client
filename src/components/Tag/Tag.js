import React from "react";

const Tag = ({ tag_name, onDeleteTag }) => {
  return (
    <div className="tag" key={tag_name}>
      <h4>{tag_name}</h4>
      {
        <button type="button" onClick={onDeleteTag}>
          X
        </button>
      }
    </div>
  );
};

export default Tag;
