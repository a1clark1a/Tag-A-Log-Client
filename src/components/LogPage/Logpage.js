import React from "react";

import "./LogPage.css";

function LogPage() {
  return (
    <section className="log-sect">
      <form className="log-form">
        <fieldset className="log-fieldset">
          <legend>Name of Log</legend>
          <label>Name of log: </label>
          <input type="text" />
          <label>Add a tag: </label>
          <input type="text" />
          <label>Tags: </label>
          <input value="tags show up here" />
          <label>Add a url:</label> <input type="text" />
          <textarea placeholder="description"></textarea>
          <button>create or edit</button>
        </fieldset>
      </form>
    </section>
  );
}

export default LogPage;
