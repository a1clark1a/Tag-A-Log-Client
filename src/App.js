import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import Layout from "./Layout";
import LandingPage from "./components/LandingPage/LandingPage";
import Dashboard from "./components/Dashboard/Dashboard";
import LogPage from "./components/LogPage/Logpage";

import "./App.css";
import ProfilePage from "./components/ProfilePage/ProfilePage";

class App extends Component {
  state = { hasError: false };

  render() {
    return (
      <Layout>
        <Switch>
          <Route exact path={"/"} component={LandingPage} />
          <Route path={"/dashboard"} component={Dashboard} />
          <Route path={"/LogPage"} component={LogPage} />
          <Route path={"/ProfilePage"} component={ProfilePage} />
        </Switch>
        <footer>
          <code>
            <a
              href="https://acperfecto.now.sh/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Anthony Clark Perfecto @{new Date().getFullYear()}
            </a>
          </code>
        </footer>
      </Layout>
    );
  }
}

export default App;
