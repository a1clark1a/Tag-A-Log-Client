import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import LandingPage from "./components/LandingPage/LandingPage";
import Dashboard from "./components/Dashboard/Dashboard";

import "./App.css";

class App extends Component {
  state = { hasError: false };

  render() {
    return (
      <main className="App">
        <Switch>
          <Route exact path={"/"} component={LandingPage} />
          <Route path={"/dashboard"} component={Dashboard} />
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
      </main>
    );
  }
}

export default App;