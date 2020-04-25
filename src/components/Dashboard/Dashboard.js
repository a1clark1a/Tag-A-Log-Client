import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

//components
import SearchBar from "../formComponents/SearchBar";
import DisplayLogList from "../DisplayLogList/DisplayLogList";
import DisplayTagList from "../DisplayTagList/DisplayTagList";

//service
import LogsService from "../../service/log-service";
import TagsService from "../../service/tag-service";
import Context from "../../context/ContextProvider";

import "./Dashboard.css";

function Dashboard() {
  const context = useContext(Context);
  const [searchType, setSearchType] = useState("name");
  const [currentPage, setCurrentPage] = useState("dash");
  const {
    error,
    logList,
    tagList,
    setError,
    setLogList,
    setTagList,
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

    LogsService.getLogs()
      .then(setLogList)
      .catch((res) => setError(res.error.message));
    TagsService.getUserTags()
      .then(setTagList)
      .catch((res) => setError(res.error.message));

    return () => {
      clearError();
    };
  }, []);

  const onChange = (e) => {
    const userInput = e.currentTarget.value;
    let filteredOptions = [];

    if (searchType === "name") {
      filteredOptions = logList.filter((log) => {
        return log.log_name.toLowerCase().indexOf(userInput.toLowerCase()) > -1;
      });
    } else {
      filteredOptions = tagList.filter((tag) => {
        return tag.tag_name.toLowerCase().indexOf(userInput.toLowerCase()) > -1;
      });
    }

    setSearch({
      activeOption: 0,
      filteredOptions,
      showOptions: true,
      userInput: e.currentTarget.value,
    });
  };

  const onClickedTag = (tag) => {
    console.log("clicked tag ", tag.tag_name);
    setSearch({
      activeOption: 0,
      filteredOptions: [],
      showOptions: false,
      userInput: "",
    });
    TagsService.getTagsListOfLogs(tag.id).then((logs) => {
      setSearchType("name");
      setSearch({
        ...search,
        filteredOptions: logs,
      });
    });
  };

  const searchList = () => {
    if (search.showOptions && search.userInput) {
      if (search.filteredOptions.length > 0 && searchType === "name") {
        return search.filteredOptions.map((log, i) => {
          return <DisplayLogList key={i} log={log} currentPage={currentPage} />;
        });
      } else if (searchType === "tag") {
        return search.filteredOptions.map((tag, i) => {
          return (
            <div key={i} onClick={() => onClickedTag(tag)}>
              <DisplayTagList tag={tag} currentPage={currentPage} />
            </div>
          );
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

  console.log(search.filteredOptions);
  return (
    <section className="app-sect">
      <section className="dashboard-sect">
        <header className="dash-header">
          <Link to={`/log`} className="create-log">
            <button>Create Log</button>
          </Link>
          <SearchBar
            onChange={onChange}
            onSelect={(e) => {
              setSearch({
                activeOption: 0,
                filteredOptions: [],
                showOptions: false,
                userInput: "",
              });
              setSearchType(e.currentTarget.value);
            }}
            searchType={searchType}
            value={search.userInput}
          />
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
