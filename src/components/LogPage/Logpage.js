import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

//service
import Context from "../../context/ContextProvider";
import LogsService from "../../service/log-service";

//components
import DisplayLog from "./DisplayLog/DisplayLog";
import CreateLog from "../formComponents/CreateLog";

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
    clearError();
    e.preventDefault();
    const { log_name, url, description } = e.target;
    const newLog = {
      log_name: log_name.value,
      url: url.value,
      description: description.value,
    };
    LogsService.postLog(newLog)
      .then((log) => {
        log_name.value = "";
        description.value = "";
        url.value = "";
        history.push(`/log/${log.id}`);
        setLog(log);
      })
      .catch((res) => setError(res.error.message));
  };

  const handleEditLog = (e) => {
    clearError();
    e.preventDefault();
    const { log_name, url, description, num_tags } = e.target;
    const newLog = {
      log_name: log_name.value,
      url: url.value,
      description: description.value,
      num_tags: num_tags || 0,
    };

    LogsService.updateLog(logId, newLog)
      .then(() => {
        log_name.value = "";
        description.value = "";
        url.value = "";
        history.push(`/log/${logId}`);
        allowEdit(false);
      })
      .catch((res) => setError(res.message));
  };

  return (
    <section className="log-sect">
      {!edit && logId ? (
        <DisplayLog
          log_name={log.log_name}
          url={log.url}
          description={log.description}
          onClick={() => allowEdit(true)}
        />
      ) : (
        <CreateLog
          log_name={log.log_name}
          url={log.url}
          description={log.description}
          edit={edit}
          num_tags={log.num_tags}
          handleEditLog={handleEditLog}
          handleCreateLog={handleCreateLog}
        />
      )}
      <div role="alert">
        {error && <p className="error-message">{error}</p>}
      </div>
    </section>
  );
}

export default LogPage;
