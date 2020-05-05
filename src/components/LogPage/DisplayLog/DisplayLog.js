import React from "react";

//component
import Tag from "../../Tag/Tag";

import "./DisplayLog.css";

const DisplayLog = ({ log, tagList = [], onClick, onDelete, disable }) => {
  const displayAddedTags = () => {
    return tagList.map((tag, i) => {
      return <Tag key={i} tag_name={tag.tag_name} currentPage={"log"} />;
    });
  };

  return (
    <article className="log log-article">
      <h1 className="log disp-log-name">{log.log_name}</h1>
      <a
        href={log.url}
        target="_blank"
        rel="noopener noreferrer"
        className="log log-url"
      >
        {log.url}
      </a>
      <h4 className="disp-log-header">Date Created:</h4>
      <code className="disp-log-date">{log.date_created}</code>

      <div className="log-tag-wrapper">
        <h4 className="disp-log-header disp-tags">Tags:</h4>
        {displayAddedTags()}
      </div>
      <h4 className="disp-log-header">Info: </h4>
      <div className="log-div">
        <p className="log disp-log-desc">{log.description}</p>
      </div>
      {!disable && (
        <div className="button-grp btn-grp-log">
          <button type="button" onClick={onClick}>
            EDIT
          </button>
          <button type="button" onClick={() => onDelete(log.id)}>
            Delete
          </button>
        </div>
      )}
    </article>
  );
};

export default DisplayLog;
