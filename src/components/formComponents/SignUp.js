import React from "react";

import InfoToolTip from "../formComponents/InfoToolTip";

import "./SignUp.css";

function SignUp({ handleSubmit }) {
  return (
    <form className="signup-form" onSubmit={(e) => handleSubmit(e)}>
      <fieldset className="signup-fieldset">
        <label htmlFor="user_name">Username: </label>
        <input
          id="user_name"
          name="user_name"
          aria-label="User Name"
          aria-required="true"
          type="text"
          placeholder="Jsmith01"
          required
        />

        <label htmlFor="email">Email: </label>
        <input
          id="email"
          name="email"
          aria-label="email"
          aria-required="true"
          type="email"
          placeholder="Jsmith01@gmail.com"
          required
        />

        <label className="label-alignment" htmlFor="password">
          Password:{" "}
          <InfoToolTip
            text={
              "Password must contain 1 upper case, lower case, number and special character"
            }
          />
        </label>

        <input
          id="password"
          name="password"
          aria-label="password"
          aria-required="true"
          type="password"
          required
        />

        <button className="form-btn" type="submit">
          Register
        </button>
      </fieldset>
    </form>
  );
}

export default SignUp;
