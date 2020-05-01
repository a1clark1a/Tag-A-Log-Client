import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";

//service
import LogsService from "../../service/log-service";
import Context from "../../context/ContextProvider";
import Tag from "../Tag/Tag";

import "./DisplayLogList.css";

const DisplayLogList = ({ log, onDelete, currentPage }) => {
  const context = useContext(Context);
  const { setError, clearError } = context;
  const [logsTags, setLogsTags] = useState([]);
  let updateComponent;

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    updateComponent = true;
    if (log.id) {
      LogsService.getLogsListOfTags(log.id)
        .then((tags) => {
          if (updateComponent) {
            setLogsTags(tags);
          }
        })
        .catch((res) => setError(res.error.message));
    }
    return () => {
      updateComponent = false;
      clearError();
      setLogsTags([]);
    };
  }, [log.id, clearError, setError]);

  const displayAddedTags = () => {
    return logsTags.map((tag, i) => {
      return <Tag key={i} tag_name={tag.tag_name} currentPage={currentPage} />;
    });
  };

  return (
    <div className="log-wrapper log">
      <Link to={`/log/${log.id}`}>
        <h3 className="log-name log">{log.log_name}</h3>
        <code>{log.date_created}</code>

        <div className="log-tag-wrapper">
          <span>Tags:</span>
          {displayAddedTags()}
        </div>
      </Link>
      {currentPage !== "dash" && (
        <button
          className="log-delete log"
          aria-label="delete"
          onClick={() => onDelete(log.id)}
        >
          X
        </button>
      )}
    </div>
  );
};

export default DisplayLogList;
