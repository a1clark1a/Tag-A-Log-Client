/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

//service
import Context from "../../context/ContextProvider";
import LogsService from "../../service/log-service";
import TagsService from "../../service/tag-service";

//components
import DisplayLog from "./DisplayLog/DisplayLog";
import CreateLog from "../formComponents/CreateLog";
import DeleteModal from "../formComponents/DeleteModal";

import "./LogPage.css";

function LogPage(props) {
  const context = useContext(Context);
  const history = useHistory();
  const [showModal, setShowModal] = useState(false);
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
          delete addedTagList[tagObj.tag_name];
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
      let removedDuplicates = [];
      logsTags.forEach((tag) => {
        addedTagList.forEach((tagName, i) => {
          if (tagName === tag.tag_name) {
            removedDuplicates.push(tag);
            delete addedTagList[i];
          }
        });
      });

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
              console.log("inside trigger");
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
        if (exist) {
          LogsService.tagALog(newLogTag)
            .then(() => {})
            .catch((res) => setError(res.error.message));
          setLogsTags([...removedDuplicates, ...addedTag]);
        } else {
          TagsService.postTag(newTag)
            .then((tag) => {
              addedTag.push(tag);

              setLogsTags([...removedDuplicates, ...addedTag]);
            })
            .catch((res) => setError(res.error.message));
        }
      });

      setLogsTags([...addedTag, ...removedDuplicates]);
    } else {
      setLogsTags([]);
    }
  };

  const handleOnDeleteLog = (logId) => {
    setShowModal("true");
  };

  const handleConfirm = () => {
    console.log("confirmed");
    LogsService.deleteLog(logId)
      .then(() => {
        deleteLogsFromList(logId);
        history.push("/dashboard");
      })
      .catch((res) => setError(res.error.message));
  };

  console.log(history);
  return (
    <section className="log-sect">
      <div role="alert" className="error-wrapper">
        {error && <p className="error-message">{error}</p>}
      </div>
      <DeleteModal
        handleConfirm={() => handleConfirm()}
        handleCancel={() => setShowModal(false)}
        show={showModal}
      >
        <span>Are you sure you want to delete? </span>
      </DeleteModal>

      {!edit && logId ? (
        <DisplayLog
          log={log}
          tagList={logsTags}
          onClick={() => {
            clearError();
            allowEdit(true);
          }}
          onDelete={handleOnDeleteLog}
          disable={showModal}
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
