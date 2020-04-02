import React, { Component } from "react";
import { Route, Switch, Link } from "react-router-dom";

import SearchBar from "../formComponents/SearchBar";
import Navbar from "../Sidebar/Navbar";
import LogPage from "../LogPage/Logpage";

import "./Dashboard.css";

class Dashboard extends Component {
  render() {
    return (
      <section className="app-sect">
        <Navbar />
        <section className="dashboard-sect">
          <header className="dash-header">
            <div>
              <Link to={"/LogPage"}>
                <button className="create-log">Create Log</button>
              </Link>
            </div>
            <SearchBar />
          </header>
          {/*Change into component */}
          <div className="search-list">
            <label>
              Sort by:{" "}
              <select>
                <option>Date created</option>
                <option>Ascending</option>
                <option>Descending</option>
              </select>
            </label>
            <div>item list </div>
            <div>item list </div>
            <div>item list </div>
            <div>item list </div>
            <div>item list </div>
            <div>item list </div>
          </div>
        </section>
        <Switch>
          <Route path={"/LogPage"} component={LogPage} />
        </Switch>
      </section>
    );
  }
}

export default Dashboard;
