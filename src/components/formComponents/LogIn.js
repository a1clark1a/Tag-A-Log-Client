import React, { useState } from "react";

import "./Login.css";

function LogIn({ handleSubmit }) {
  return (
    <form className="login-form" onSubmit={(e) => handleSubmit(e)}>
      <fieldset className="login-fieldset">
        <label htmlFor="user_name">
          Username:{" "}
          <input id="user_name" type="text" placeholder="Enter user_name" />
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
