import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import AuthApiService from "../../service/auth-api-service";
import UsersService from "../../service/user-service";
import TokenService from "../../service/token-service";

import LogIn from "../formComponents/LogIn";
import SignUp from "../formComponents/SignUp";

import "./LandingPage.css";

function LandingPage() {
  const [active, setActive] = useState(null);
  const [error, setError] = useState(null);
  const history = useHistory();

  const handleLogin = (e) => {
    e.preventDefault();
    setError(null);

    const { user_name, password } = e.target;

    AuthApiService.postLoginUser({
      user_name: user_name.value,
      password: password.value,
    })
      .then((res) => {
        user_name.value = "";
        password.value = "";
        TokenService.saveAuthToken(res.authToken);
        history.push("/dashboard");
      })
      .catch((res) => {
        setError(res.error.message);
      });
  };

  const handleRegisterNewUser = (e) => {
    e.preventDefault();
    setError(null);

    const { user_name, password, email, re_type_password } = e.target;
    const new_user = {
      user_name: user_name.value,
      password: password.value,
      email: email.value,
    };

    UsersService.postRegisterUser(new_user)
      .then((res) => {
        user_name.value = "";
        password.value = "";
        email.value = "";
        re_type_password.value = "";
        console.log(res);
        if (res) {
          console.log("trigger");
          AuthApiService.postLoginUser({
            user_name: new_user.user_name,
            password: new_user.password,
          })
            .then((res) => {
              user_name.value = "";
              password.value = "";
              TokenService.saveAuthToken(res.authToken);
              history.push("/dashboard");
            })
            .catch((res) => {
              setError(res.error.message);
            });
        }
      })
      .catch((res) => {
        setError(res.error.message);
      });
  };

  const demo = () => {
    AuthApiService.postLoginUser({
      user_name: "demo",
      password: "password",
    })
      .then((res) => {
        TokenService.saveAuthToken(res.authToken);
        history.push("/dashboard");
      })
      .catch((res) => setError(res.error.message));
  };

  return (
    <section className="landing-sect">
      <header role="banner" className="banner">
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
        <button
          className="form-btn signUp"
          onClick={() => {
            setActive("signUp");
            setError(null);
          }}
        >
          Sign Up
        </button>
        {active === "signUp" && (
          <SignUp handleSubmit={(e) => handleRegisterNewUser(e)} />
        )}
        <div role="alert">
          {error && <p className="error-message">{error}</p>}
        </div>
        <button
          className="form-btn logIn"
          onClick={() => {
            setActive("logIn");
            setError(null);
          }}
        >
          Login
        </button>
        {active === "logIn" && <LogIn handleSubmit={(e) => handleLogin(e)} />}
        <button onClick={demo}>Demo</button>
      </article>
    </section>
  );
}

export default LandingPage;
