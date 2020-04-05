import React, { Component } from "react";
import { Link } from "react-router-dom";

import SearchBar from "../formComponents/SearchBar";

import "./Dashboard.css";

class Dashboard extends Component {
  searchList() {
    const list = [];
    for (let i = 0; i < 25; i++) {
      list.push(
        <Link to={`/logpage/${i}`}>
          <div>item list </div>
        </Link>
      );
    }
    return list;
  }

  render() {
    return (
      <section className="app-sect">
        <section className="dashboard-sect">
          <header className="dash-header">
            <Link to={`/logpage/${1 /*temp num */}`} className="create-log">
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
            {this.searchList()}
          </div>
        </section>
      </section>
    );
  }
}

export default Dashboard;
