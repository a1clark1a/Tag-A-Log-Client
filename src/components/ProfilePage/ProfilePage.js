import React, { useState, useContext, useEffect } from "react";

//component
import DisplayLogList from "../DisplayLogList/DisplayLogList";
import DisplayTagList from "../DisplayTagList/DisplayTagList";
import SortBy from "../formComponents/SortBy";
import Tag from "../Tag/Tag";

//service
import Context from "../../context/ContextProvider";
import LogsService from "../../service/log-service";
import TagsService from "../../service/tag-service";

import "./ProfilePage.css";

function ProfilePage() {
  const [active, setActive] = useState("Logs");
  const [sortBy, setSortBy] = useState();
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

  const onDeleteLog = (logId) => {
    console.log("deleting", logId);
    LogsService.deleteLog(logId)
      .then(() => {
        deleteLogsFromList(logId);
      })
      .catch((res) => setError(res.error.message));
  };

  const onDeleteTag = (tagId) => {
    console.log("deleting", tagId);
    TagsService.deleteTag(tagId)
      .then(() => {
        deleteTagsFromList(tagId);
      })
      .catch((res) => setError(res.error.message));
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
  /*
  const displayTags = () => {
    return tagList.map((tag, i) => {
      return <DisplayTagList key={i} tag={tag} onDelete={onDeleteTag} />;
    });
  }; */

  const displayTags = () => {
    return tagList.map((tag, i) => {
      return (
        <Tag
          key={i}
          tag_name={tag.tag_name}
          onDeleteTag={() => onDeleteTag(tag.id)}
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
      <div className={`prof-${active} list`}>
        {active === "Logs" && (
          <SortBy
            sortBy={sortBy}
            onSelect={(e) => setSortBy(e.currentTarget.value)}
          />
        )}
        {active === "Logs" ? displayLogs() : displayTags()}
      </div>
    </section>
  );
}

export default ProfilePage;
