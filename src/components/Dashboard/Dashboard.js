import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

//components
import SearchBar from "../formComponents/SearchBar";
import DisplayLogList from "../DisplayLogList/DisplayLogList";

//service
import LogsService from "../../service/log-service";
import Context from "../../context/ContextProvider";

import "./Dashboard.css";

function Dashboard() {
  const context = useContext(Context);
  const {
    error,
    logList,
    setError,
    setLogList,
    clearError,
    clearLogList,
  } = context;
  const [search, setSearch] = useState({
    activeOption: 0,
    filteredOptions: [],
    showOptions: false,
    userInput: "",
  });

  useEffect(() => {
    clearError();
    LogsService.getUsersLogs()
      .then(setLogList)
      .catch((res) => setError(res.error.message));
    return () => {
      clearLogList();
    };
  }, []);

  const onChange = (e) => {
    const userInput = e.currentTarget.value;

    const filteredOptions = logList.filter((log) => {
      return log.log_name.toLowerCase().indexOf(userInput.toLowerCase()) > -1;
    });

    setSearch({
      activeOption: 0,
      filteredOptions,
      showOptions: true,
      userInput: e.currentTarget.value,
    });
  };

  const searchList = () => {
    if (search.showOptions && search.userInput) {
      if (search.filteredOptions.length > 0) {
        return search.filteredOptions.map((log, i) => {
          return <DisplayLogList key={i} log={log} />;
        });
      } else {
        return (
          <div>
            <h1>No Log by the name or tag</h1>
          </div>
        );
      }
    }
  };

  return (
    <section className="app-sect">
      <section className="dashboard-sect">
        <header className="dash-header">
          <Link to={`/log`} className="create-log">
            <button>Create Log</button>
          </Link>
          <SearchBar onChange={onChange} value={search.userInput} />
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
          <div role="alert">
            {error && <p className="error-message">{error}</p>}
          </div>
          {searchList()}
        </div>
      </section>
    </section>
  );
}

export default Dashboard;
