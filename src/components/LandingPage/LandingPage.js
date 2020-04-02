import React, { useState } from "react";
import { Link } from "react-router-dom";

import LogIn from "../formComponents/LogIn";
import SignUp from "../formComponents/SignUp";

import "./LandingPage.css";

function LandingPage() {
  const [active, setActive] = useState(null);

  return (
    <section className="landing-sect">
      <header role="banner">
        <article className="banner-group">
          <h1 className="app-title">Tech-Log</h1>
          <h3 className="app-desc">
            An information, bookmarks and log manager that allows users to store
            urls, code snippets or articles notes with appropriate description
            and "tag" them for categorization and fast searching for easier log
            management.
          </h3>
        </article>
      </header>
      <article className="button-group">
        <button className="form-btn signUp" onClick={() => setActive("signUp")}>
          Sign Up
        </button>
        {active === "signUp" && <SignUp />}
        <Link to="/dashboard">
          {/*Temporary Link for static-client with no login function */}
          <button className="form-btn logIn" onClick={() => setActive("logIn")}>
            Login
          </button>
        </Link>
      </article>
    </section>
  );
}

export default LandingPage;
