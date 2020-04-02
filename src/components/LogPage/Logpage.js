import React from "react";

function LogPage() {
  return (
    <section className="log-sect">
      <form>
        <fieldset>
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
          <textarea rows="20" cols="50" placeholder="description"></textarea>
          <button>create</button>
        </fieldset>
      </form>
    </section>
  );
}

export default LogPage;
