import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

//service
import Context from "../../context/ContextProvider";
import LogsService from "../../service/log-service";

import "./LogPage.css";

function LogPage(props) {
  const context = useContext(Context);
  const history = useHistory();
  const [edit, allowEdit] = useState(false);
  const { logId } = props.match.params;
  const { log, setLog, error, setError, clearError, clearLog } = context;

  useEffect(() => {
    clearError();
    if (logId) {
      allowEdit(true);
      LogsService.getClickedLog(logId)
        .then(setLog)
        .catch((res) => setError(res.error.message));
    }
    return () => {
      clearLog();
      clearError();
    };
  }, []);

  const handleCreateLog = (e) => {
    e.preventDefault();
    const { log_name, url, description } = e.target;
    const newLog = {
      log_name: log_name.value,
      url: url.value,
      description: description.value,
    };
    LogsService.postLog(newLog)
      .then((res) => {
        log_name.value = "";
        description.value = "";
        url.value = "";
        history.push(`/log/${res.id}`);
        setLog(res);
        allowEdit(true);
      })
      .catch((res) => setError(res.error.message));
  };

  const handleEditLog = (e) => {
    e.preventDefault();
  };

  return (
    <section className="log-sect">
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
            defaultValue={log.log_name}
            value={log.log_name}
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
            defaultValue={log.url}
            value={log.url}
          />
          <textarea
            name="description"
            id="description"
            aria-label="description"
            defaultValue={log.description}
            value={log.description}
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
      <div role="alert">
        {error && <p className="error-message">{error}</p>}
      </div>
    </section>
  );
}

export default LogPage;
