import React, { useState } from "react";

import "./CreateLog.css";

const CreateLog = ({
  log_name,
  url,
  description,
  num_tags,
  edit,
  handleEditLog,
  handleCreateLog,
}) => {
  const [newLog, setNewLog] = useState({
    log_name: log_name || "",
    url: url || "",
    description: description || "",
    num_tags: num_tags || 0,
  });
  const [tag, setTag] = useState("");
  const [tagList, setTagList] = useState([]);

  //refactor into a react component
  const displayAddedTags = () => {
    return tagList.map((tag, i) => {
      return <div key={i}>{tag}</div>;
    });
  };

  return (
    <form
      className="log-form"
      onSubmit={(e) => (edit ? handleEditLog(e) : handleCreateLog(e, tagList))}
    >
      <fieldset className="log-fieldset">
        <label>Name of log: </label>
        <input
          name="log_name"
          id="log_name"
          aria-label="log_name"
          type="text"
          value={newLog.log_name}
          autoComplete="off"
          onChange={(e) =>
            setNewLog({
              ...newLog,
              log_name: e.target.value,
            })
          }
        />
        <label>Add a tag: </label>
        <div>
          <input
            type="text"
            name="tag"
            id="tag"
            aria-label="tag"
            autoComplete="off"
            onChange={(e) => setTag(e.currentTarget.value)}
          />

          <button
            type="button"
            onClick={(e) => {
              setTag("");
              setTagList((elem) => [...elem, tag]);
            }}
          >
            add
          </button>
        </div>
        <label>Tags: up to 5 </label>
        <div>{displayAddedTags()}</div>
        <label>Add a url:</label>
        <input
          name="url"
          id="url"
          aria-label="url"
          type="URL"
          value={newLog.url}
          onChange={(e) =>
            setNewLog({
              ...newLog,
              url: e.target.value,
            })
          }
        />
        <textarea
          name="description"
          id="description"
          aria-label="description"
          value={newLog.description}
          onChange={(e) =>
            setNewLog({
              ...newLog,
              description: e.target.value,
            })
          }
        />
        {edit ? (
          <button className="create-log" type="submit">
            Edit
          </button>
        ) : (
          <button name="log-form" className="edit-log" type="submit">
            Create
          </button>
        )}
      </fieldset>
    </form>
  );
};

export default CreateLog;
