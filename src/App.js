import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import Layout from "./Layout";
import Authenticate from "./utility/Authenitcate";
import LandingPage from "./components/LandingPage/LandingPage";
import Dashboard from "./components/Dashboard/Dashboard";
import LogPage from "./components/LogPage/Logpage";
import ProfilePage from "./components/ProfilePage/ProfilePage";
import NotFoundPage from "./components/NotFoundPage/NotFoundPage";

import { LogProvider } from "./context/ContextProvider";

import "./App.css";

class App extends Component {
  state = { hasError: false };

  render() {
    return (
      <LogProvider>
        <Layout>
          <Switch>
            <Route exact path={"/"} component={LandingPage} />
            <Authenticate path={"/dashboard"} component={Dashboard} />
            <Authenticate path={"/log/:logId"} component={LogPage} />
            <Authenticate path={"/log"} component={LogPage} />
            <Authenticate path={"/profilepage"} component={ProfilePage} />
            <Route path={"/*"} component={NotFoundPage} />
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
      </LogProvider>
    );
  }
}

export default App;
