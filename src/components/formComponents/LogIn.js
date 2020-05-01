import React from "react";

import "./Login.css";

function LogIn({ handleSubmit }) {
  return (
    <form className="login-form" onSubmit={(e) => handleSubmit(e)}>
      <fieldset className="login-fieldset">
        <label htmlFor="user_name">Username: </label>
        <input
          id="user_name"
          type="text"
          aria-label="user name"
          placeholder="Enter user_name"
        />

        <label htmlFor="password">Password:</label>
        <input
          id="password"
          type="password"
          aria-label="password"
          placeholder="password"
        />

        <button className="form-btn" type="submit">
          Enter
        </button>
      </fieldset>
    </form>
  );
}

export default LogIn;
