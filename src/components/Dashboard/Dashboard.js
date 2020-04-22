import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";

//components
import SearchBar from "../formComponents/SearchBar";
import DisplayLogList from "../DisplayLogList/DisplayLogList";

//service
import LogsService from "../../service/log-service";
import Context from "../../context/ContextProvider";

import "./Dashboard.css";

function Dashboard(props) {
  const context = useContext(Context);
  const {
    error,
    logList,
    setError,
    setLogList,
    clearError,
    clearLogList,
  } = context;

  useEffect(() => {
    clearError();
    LogsService.getUsersLogs()
      .then(setLogList)
      .catch((res) => setError(res.error.message));
    return () => {
      clearLogList();
    };
  }, []);

  const searchList = () => {
    return logList.map((log, i) => {
      return <DisplayLogList key={i} log={log} />;
    });
  };

  return (
    <section className="app-sect">
      <section className="dashboard-sect">
        <header className="dash-header">
          <Link to={`/log`} className="create-log">
            <button>Create Log</button>
          </Link>
          <SearchBar />
        </header>
        <div className="search-list list">
          <label className="sort-by-label">
            Sort by:{" "}
            <select>
              <option>Date created</option>
              <option>Ascending</option>
              <option>Descending</option>
            </select>
          </label>
          {searchList()}
        </div>
      </section>
    </section>
  );
}

export default Dashboard;
