/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useContext, useEffect } from "react";

//component
import DisplayLogList from "../DisplayLogList/DisplayLogList";
import SortBy from "../formComponents/SortBy";
import Tag from "../Tag/Tag";
import DeleteModal from "../formComponents/DeleteModal";

//service
import Context from "../../context/ContextProvider";
import LogsService from "../../service/log-service";
import TagsService from "../../service/tag-service";

import "./ProfilePage.css";

function ProfilePage() {
  const [active, setActive] = useState("Logs");
  const [sortBy, setSortBy] = useState();
  const [showModal, setShowModal] = useState(false);
  const [toDelete, setToDelete] = useState(null);
  const context = useContext(Context);
  const {
    error,
    logList,
    tagList,

    setError,
    setLogList,
    setTagList,

    clearError,
    clearLogList,
    clearTagList,

    deleteLogsFromList,
    deleteTagsFromList,
  } = context;

  useEffect(() => {
    clearError();
    LogsService.getUsersLogs()
      .then(setLogList)
      .catch((res) => setError(res.error.message));
    TagsService.getUserTags()
      .then(setTagList)
      .catch((res) => setError(res.error.message));

    return () => {
      clearLogList();
      clearTagList();
      clearError();
    };
  }, []);

  const onDeleteLog = (obj) => {
    setShowModal(true);
    setToDelete(obj);
  };

  const handleConfirm = () => {
    if ("tag_name" in toDelete) {
      TagsService.deleteTag(toDelete.id)
        .then(() => {
          deleteTagsFromList(toDelete.id);
        })
        .catch((res) => setError(res.error.message));
    } else {
      LogsService.deleteLog(toDelete.id)
        .then(() => {
          deleteLogsFromList(toDelete.id);
        })
        .catch((res) => setError(res.error.message));
    }
    setShowModal(false);
    setToDelete(null);
  };

  const displayLogs = () => {
    const logs = logList;
    if (sortBy === "descending") {
      logs.sort((logA, logB) => {
        return new Date(logA.date_created) - new Date(logB.date_created);
      });
    }
    if (sortBy === "ascending") {
      logs.sort((logA, logB) => {
        return new Date(logB.date_created) - new Date(logA.date_created);
      });
    }
    return logs.map((log, i) => {
      return (
        <DisplayLogList
          key={i}
          log={log}
          onDelete={onDeleteLog}
          currentPage={"Profile"}
        />
      );
    });
  };

  const displayTags = () => {
    return tagList.map((tag, i) => {
      return (
        <Tag
          key={i}
          tag_name={tag.tag_name}
          onDeleteTag={() => onDeleteLog(tag)}
        />
      );
    });
  };

  return (
    <section className="profile-sect">
      <header className="button-grp">
        <button
          className={active === "Logs" ? "active" : ""}
          onClick={() => setActive("Logs")}
        >
          Logs
        </button>
        <button
          className={active === "Tags" ? "active" : ""}
          onClick={() => setActive("Tags")}
        >
          Tags
        </button>
      </header>
      <DeleteModal
        handleConfirm={handleConfirm}
        handleCancel={() => setShowModal(false)}
        show={showModal}
      >
        <span>Are you sure you want to delete?</span>
      </DeleteModal>
      <div className={`prof-${active} list`}>
        {active === "Logs" && (
          <SortBy
            sortBy={sortBy}
            onSelect={(e) => setSortBy(e.currentTarget.value)}
          />
        )}
        <div role="alert" className="error-wrapper">
          {error && <p className="error-message">{error}</p>}
        </div>
        {active === "Logs" ? displayLogs() : displayTags()}
      </div>
    </section>
  );
}

export default ProfilePage;
