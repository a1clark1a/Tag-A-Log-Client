import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";

//service
import LogsService from "../../service/log-service";
import Context from "../../context/ContextProvider";

import "./DisplayLogList.css";

const DisplayLogList = ({ log, onDelete, currentPage }) => {
  const context = useContext(Context);
  const { setError, clearError } = context;
  const [logsTags, setLogsTags] = useState([]);

  useEffect(() => {
    if (log.id) {
      LogsService.getLogsListOfTags(log.id)
        .then((tags) => {
          setLogsTags(tags);
        })
        .catch((res) => setError(res.error.message));
    }
    return () => {
      clearError();
      setLogsTags([]);
    };
  }, [log.id, clearError, setError]);

  const displayAddedTags = () => {
    return logsTags.map((tag, i) => {
      return (
        <div className={"tag-box"} key={i}>
          <h3>{tag.tag_name}</h3>
        </div>
      );
    });
  };

  return (
    <div className="log-wrapper log">
      <Link to={`/log/${log.id}`}>
        <h3 className="log-name log">{log.log_name}</h3>
        <div className="log-tag-wrapper">Tags: {displayAddedTags()}</div>
      </Link>
      {currentPage !== "dash" && (
        <button className="log-delete log" onClick={() => onDelete(log.id)}>
          X
        </button>
      )}
    </div>
  );
};

export default DisplayLogList;
