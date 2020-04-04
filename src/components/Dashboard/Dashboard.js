import React, { Component } from "react";
import { Link } from "react-router-dom";

import SearchBar from "../formComponents/SearchBar";

import "./Dashboard.css";

class Dashboard extends Component {
  render() {
    return (
      <section className="app-sect">
        <section className="dashboard-sect">
          <header className="dash-header">
            <div>
              <Link to={"/logpage"}>
                <button className="create-log">Create Log</button>
              </Link>
            </div>
            <SearchBar />
          </header>
          <div className="search-list">
            <label>
              Sort by:{" "}
              <select>
                <option>Date created</option>
                <option>Ascending</option>
                <option>Descending</option>
              </select>
            </label>
            <Link to={"/LogPage"}>
              <div>item list </div>
            </Link>
            <Link to={"/LogPage"}>
              <div>item list </div>
            </Link>
            <Link to={"/LogPage"}>
              <div>item list </div>
            </Link>
            <Link to={"/LogPage"}>
              <div>item list </div>
            </Link>
            <Link to={"/LogPage"}>
              <div>item list </div>
            </Link>
            <Link to={"/LogPage"}>
              <div>item list </div>
            </Link>
          </div>
        </section>
      </section>
    );
  }
}

export default Dashboard;
