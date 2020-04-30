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
  const [logsTags, setLogsTags] = useState([]);
  const { logId } = props.match.params;
  const {
    log,
    setLog,
    tagList,
    setTagList,
    error,
    setError,
    clearError,
    clearLog,
    deleteLogsFromList,
  } = context;

  useEffect(() => {
    clearError();
    if (logId) {
      LogsService.getClickedLog(logId)
        .then(setLog)
        .catch((res) => setError(res.error.message));
      LogsService.getLogsListOfTags(logId)
        .then(setLogsTags)
        .catch((res) => setError(res.error.message));
      TagsService.getUserTags()
        .then(setTagList)
        .catch((res) => setError(res.error.message));
    }
    return () => {
      clearLog();
      clearError();
    };
  }, []);

  const handleCreateLog = (e, addedTagList = []) => {
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
        handleLogTagRelation(addedTagList, log.id);
        history.push(`/log/${log.id}`);
        setLog(log);
      })
      .catch((res) => setError(res.error.message));
  };

  const handleEditLog = (e, addedTagList = [], tagsToDelete = []) => {
    clearError();
    e.preventDefault();

    if (tagsToDelete.length > 0) {
      tagsToDelete.forEach((tagToDelete) => {
        let tagObj = logsTags.find((tag) => tag.tag_name === tagToDelete);
        if (tagObj) {
          LogsService.deleteALogTag(logId, tagObj.id).catch((res) =>
            setError(res.error.message)
          );
        }
      });
    }

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
        handleLogTagRelation(addedTagList, logId);
        history.push(`/log/${logId}`);
        allowEdit(false);
      })
      .catch((res) => setError(res.error.message));
  };

  const handleLogTagRelation = (addedTagList = [], logId) => {
    if (addedTagList.length > 0) {
      let addedTag = [];
      addedTagList.forEach((tagName) => {
        const newTag = {
          tag_name: tagName,
          log_id: logId,
        };
        let exist = false;
        let newLogTag = {};
        tagList.forEach((tag) => {
          for (const [key, value] of Object.entries(tag)) {
            if (value === tagName) {
              addedTag.push(tag);
              newLogTag = {
                log_id: logId,
                tag_id: tag.id,
              };
              exist = true;
              break;
            }
          }
        });
        console.log(exist);
        if (exist) {
          LogsService.tagALog(newLogTag)
            .then(() => {})
            .catch((res) => setError(res.error.message));
          setLogsTags([...addedTag]);
        } else {
          TagsService.postTag(newTag)
            .then((tag) => {
              addedTag.push(tag);
              console.log(addedTag);
              setLogsTags([...logsTags, ...addedTag]);
            })
            .catch((res) => setError(res.error.message));
        }
      });
    } else {
      setLogsTags([]);
    }
  };

  const handleOnDeleteLog = (logId) => {
    LogsService.deleteLog(logId)
      .then(() => {
        deleteLogsFromList(logId);
        history.push("/dashboard");
      })
      .catch((res) => setError(res.error.message));
  };

  return (
    <section className="log-sect">
      <div role="alert" className="error-wrapper">
        {error && <p className="error-message">{error}</p>}
      </div>

      {!edit && logId ? (
        <DisplayLog
          log={log}
          tagList={logsTags}
          onClick={() => {
            clearError();
            allowEdit(true);
          }}
          onDelete={handleOnDeleteLog}
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
          currentTags={logsTags}
        />
      )}
    </section>
  );
}

export default LogPage;
