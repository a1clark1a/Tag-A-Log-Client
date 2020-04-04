import React from "react";

import "./LogPage.css";

function LogPage() {
  return (
    <section className="log-sect">
      <form className="log-form">
        <fieldset className="log-fieldset">
          <legend>Name of Log</legend>
          <label>
            Name of log: <input type="text" />
          </label>
          <label>
            Add a tag: <input type="text" />
          </label>
          <label>
            Tags: <input value="tags show up here" />
          </label>
          <label>
            Add a url: <input type="text" />
          </label>
          <textarea placeholder="description"></textarea>
          <button>create or edit</button>
        </fieldset>
      </form>
    </section>
  );
}

export default LogPage;
