import React, { useState } from "react";

const Context = React.createContext({
  error: null,
  log: {},
  logList: [],
  tag: {},
  tagList: [],

  setError: () => {},
  setLog: () => {},
  setLogList: () => {},
  setTag: () => {},
  setTagList: () => {},

  clearError: () => {},
  clearLog: () => {},
  clearLogList: () => {},
  clearTag: () => {},
  clearTagList: () => {},

  deleteLogsFromList: () => {},
  deleteTagsFromList: () => {},
});

export default Context;

export function LogProvider(props) {
  const [error, setError] = useState(null);
  const [log, setLog] = useState({});
  const [logList, setLogList] = useState([]);
  const [tag, setTag] = useState({});
  const [tagList, setTagList] = useState([]);

  const clearError = () => {
    setError(null);
  };

  const clearLog = () => {
    setLog({});
  };

  const clearLogList = () => {
    setLogList([]);
  };

  const clearTag = () => {
    setTag({});
  };

  const clearTagList = () => {
    setTagList([]);
  };

  const deleteLogsFromList = (logId) => {
    const newLogList = logList.filter((log) => {
      return log.id !== logId;
    });
    setLogList(newLogList);
  };

  const deleteTagsFromList = (tagId) => {
    const newTagList = tagList.filter((tag) => {
      return tag.id !== tagId;
    });
    setTagList(newTagList);
  };

  const contextValue = {
    error,
    log,
    logList,
    tag,
    tagList,

    setError,
    setLog,
    setLogList,
    setTag,
    setTagList,

    clearError,
    clearLog,
    clearLogList,
    clearTag,
    clearTagList,

    deleteLogsFromList,
    deleteTagsFromList,
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
}
