import React from "react";

import "./DisplayLog.css";

const DisplayLog = ({ log, tagList = [], onClick, onDelete }) => {
  const displayAddedTags = () => {
    return tagList.map((tag, i) => {
      return (
        <div className={"tag-box"} key={i}>
          <h3>{tag.tag_name}</h3>
        </div>
      );
    });
  };

  return (
    <section className="log log-sect">
      <div className="log-div">
        <h1 className="log disp-log-name">{log.log_name}</h1>
        <code>{log.date_created}</code>
        <div className="log-tag-wrapper">Tags: {displayAddedTags()}</div>
        <a
          href={log.url}
          target="_blank"
          rel="noopener noreferrer"
          className="log log-url"
        >
          {log.url}
        </a>
        <h4 className="log disp-log-desc">{log.description}</h4>
      </div>
      <button type="button" onClick={onClick}>
        EDIT
      </button>
      <button type="button" onClick={() => onDelete(log.id)}>
        Delete
      </button>
    </section>
  );
};

export default DisplayLog;
