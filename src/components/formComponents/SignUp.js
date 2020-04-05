import React from "react";

import "./SignUp.css";

function SignUp({ handleSubmit }) {
  return (
    <form className="signup-form" onSubmit={e => handleSubmit(e)}>
      <fieldset className="signup-fieldset">
        <label htmlFor="full-name">
          Full Name:{" "}
          <input
            id="full-name"
            name="full-name"
            aria-label="Full Name"
            aria-required="true"
            type="text"
            placeholder="John Smith"
            required
          />
        </label>
        <label htmlFor="user-name">
          Username:{" "}
          <input
            id="user-name"
            name="user-name"
            aria-label="User Name"
            aria-required="true"
            type="text"
            placeholder="Jsmith01"
            required
          />
        </label>
        <label htmlFor="password">
          Password:{" "}
          <input
            id="password"
            name="password"
            aria-label="password"
            aria-required="true"
            type="password"
            required
          />
        </label>
        <label htmlFor="re-type-password">
          Re-type Password:{" "}
          <input
            id="re-type-password"
            name="re-type-password"
            aria-label="password"
            aria-required="true"
            type="password"
            required
          />
        </label>
        <button className="form-btn" type="submit" disabled>
          Register
        </button>
      </fieldset>
    </form>
  );
}

export default SignUp;
