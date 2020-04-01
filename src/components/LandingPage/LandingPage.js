import React from "react";

import "./LandingPage.css";

function LandingPage() {
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
        {/*TODO make these toggle buttons to hide/unhide form components for each button */}
        <button>Sign Up</button> {/* TODO replace with form components*/}
        <button>Login</button> {/* TODO replace with form components*/}
      </article>
    </section>
  );
}

export default LandingPage;
