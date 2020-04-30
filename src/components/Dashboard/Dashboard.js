import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

//components
import SearchBar from "../formComponents/SearchBar";
import DisplayLogList from "../DisplayLogList/DisplayLogList";
import DisplayTagList from "../DisplayTagList/DisplayTagList";
import SortBy from "../formComponents/SortBy";

//service
import LogsService from "../../service/log-service";
import TagsService from "../../service/tag-service";
import Context from "../../context/ContextProvider";

import logo from "../../Icon/Logo.png";
import "./Dashboard.css";

function Dashboard() {
  const context = useContext(Context);
  const [searchType, setSearchType] = useState("name");
  const [sortBy, setSortBy] = useState("");
  const [currentPage, setCurrentPage] = useState("");
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
    setCurrentPage("dash");

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
        if (sortBy === "descending") {
          search.filteredOptions.sort((logA, logB) => {
            return new Date(logA.date_created) - new Date(logB.date_created);
          });
        }
        if (sortBy === "ascending") {
          search.filteredOptions.sort((logA, logB) => {
            return new Date(logB.date_created) - new Date(logA.date_created);
          });
        }

        return search.filteredOptions.map((log, i) => {
          return <DisplayLogList key={i} log={log} currentPage={currentPage} />;
        });
      } else if (search.filteredOptions.length > 0 && searchType === "tag") {
        if (sortBy === "descending") {
          search.filteredOptions.sort((tagA, tagB) => {
            return new Date(tagA.date_created) - new Date(tagB.date_created);
          });
        }
        if (sortBy === "ascending") {
          search.filteredOptions.sort((logA, logB) => {
            return new Date(logB.date_created) - new Date(logA.date_created);
          });
        }

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

  return (
    <section className="app-sect">
      <section className="dashboard-sect">
        <header className="dash-header">
          <div className="create-log">
            <Link to={`/log`}>
              <img className="logo" src={logo} alt={"create-log-button"} />
            </Link>
            <h2 className="create-log-h2">Create Log</h2>
          </div>
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
        <div className={`search-list list ${searchType}-search-list`}>
          <label className="sort-by-label">
            <SortBy
              sortBY={sortBy}
              onSelect={(e) => setSortBy(e.currentTarget.value)}
            />
          </label>
          <div>{searchList()}</div>
          <div role="alert" className="error-wrapper">
            {error && <p className="error-message">{error}</p>}
          </div>
        </div>
      </section>
    </section>
  );
}

export default Dashboard;
