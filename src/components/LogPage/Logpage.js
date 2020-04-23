import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

//service
import Context from "../../context/ContextProvider";
import LogsService from "../../service/log-service";
import TagsService from "../../service/tag-service";

//components
import DisplayLog from "./DisplayLog/DisplayLog";
import CreateLog from "../formComponents/CreateLog";

import "./LogPage.css";

function LogPage(props) {
  const context = useContext(Context);
  const history = useHistory();
  const [edit, allowEdit] = useState(false);
  const { logId } = props.match.params;
  const {
    log,
    setLog,
    error,
    setError,
    tagList,
    setTagList,
    clearError,
    clearLog,
    clearTagList,
  } = context;

  useEffect(() => {
    clearError();
    if (logId) {
      LogsService.getClickedLog(logId)
        .then(setLog)
        .catch((res) => setError(res.error.message));
      LogsService.getLogsListOfTags(logId)
        .then(setTagList)
        .catch((res) => {
          console.log(res);
          setError(res.error.message);
        });
    }
    return () => {
      clearLog();
      clearTagList();
      clearError();
    };
  }, []);

  const handleCreateLog = (e, addedTagList = []) => {
    clearError();
    e.preventDefault();
    console.log(addedTagList);
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
        handleLogTagRelation(addedTagList, log.id);
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
      .catch((res) => setError(res.error.message));
  };

  const handleLogTagRelation = (addedTagList = [], logId) => {
    if (addedTagList.length > 0) {
      addedTagList.forEach((tag) => {
        const newTag = {
          tag_name: tag,
          log_id: logId,
        };
        TagsService.postTag(newTag)
          .then((tag) => {
            console.log(tag);
          })
          .catch((res) => setError(res.error.message));
      });
    }
  };

  return (
    <section className="log-sect">
      {!edit && logId ? (
        <DisplayLog
          log_name={log.log_name}
          url={log.url}
          tagList={tagList}
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
