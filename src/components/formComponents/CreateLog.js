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

  return (
    <form
      className="log-form"
      onSubmit={edit ? handleEditLog : handleCreateLog}
    >
      <fieldset className="log-fieldset">
        <label>Name of log: </label>
        <input
          name="log_name"
          id="log_name"
          aria-label="log_name"
          type="text"
          value={newLog.log_name}
          onChange={(e) =>
            setNewLog({
              ...newLog,
              log_name: e.target.value,
            })
          }
        />
        <label>Add a tag: </label>
        <input type="text" />
        <label>Tags: </label>
        <input defaultValue="tags show up here" />
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
