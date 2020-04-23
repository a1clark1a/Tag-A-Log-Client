import React from "react";

import "./DisplayLog.css";

const DisplayLog = ({
  log_name,
  url,
  num_tags,
  description,
  tagList = [],
  onClick,
}) => {
  console.log(tagList);

  const displayAddedTags = () => {
    return tagList.map((tag, i) => {
      console.log(tag);
      return <h3 key={i}>{tag.tag_name}</h3>;
    });
  };

  return (
    <section className="log log-sect">
      <div className="log-div">
        <h1 className="log disp-log-name">{log_name}</h1>
        <div className="log-tag-wrapper">Tags: {displayAddedTags()}</div>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="log log-url"
        >
          {url}
        </a>
        <h4 className="log disp-log-desc">{description}</h4>
      </div>
      <button type="button" onClick={onClick}>
        EDIT
      </button>
    </section>
  );
};

export default DisplayLog;
