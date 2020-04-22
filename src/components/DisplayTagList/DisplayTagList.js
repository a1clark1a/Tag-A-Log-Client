import React from "react";

import "./DisplayTagList.css";

const DisplayTagList = ({ tag }) => {
  return (
    <div className="log-wrapper log">
      <h3 className="log-name log">{tag.tag_name}</h3>
      <button className="log-delete log">X</button>
    </div>
  );
};

export default DisplayTagList;
