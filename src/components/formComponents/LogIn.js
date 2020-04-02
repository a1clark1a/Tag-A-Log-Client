import React from "react";

function LogIn({ handleSubmit }) {
  return (
    <form onSubmit={e => handleSubmit(e)}>
      <fieldset>
        <label htmlFor="user-name">
          Username:{" "}
          <input id="user-name" type="text" placeholder="Enter user-name" />
        </label>
        <label htmlFor="password">
          Password:{" "}
          <input id="password" type="password" placeholder="password" />
        </label>
        <button type="submit">Enter</button>
      </fieldset>
    </form>
  );
}

export default LogIn;
