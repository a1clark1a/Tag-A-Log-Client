import React, { useState } from "react";
import { useHistory } from "react-router-dom";

//service
import AuthApiService from "../../service/auth-api-service";
import UsersService from "../../service/user-service";
import TokenService from "../../service/token-service";

//components
import LogIn from "../formComponents/LogIn";
import SignUp from "../formComponents/SignUp";

//CSS and icons
import logo from "../../Icon/Logo.png";
import arrow from "../../Icon/Arrow.png";
import create from "../../Icon/CreateLog.png";
import mobile from "../../Icon/mobileCreate.png";
import addTag from "../../Icon/AddATag.png";
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
              console.log(res);
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
      password: "Password123!",
    })
      .then((res) => {
        TokenService.saveAuthToken(res.authToken);
        history.push("/dashboard");
      })
      .catch((res) => setError(res.error.message));
  };

  return (
    <section className="landing-sect">
      <nav>
        <a href="#signup">Sign Up</a>
        <a href="#login">Login</a>
        <a onClick={demo}>Demo</a>
      </nav>
      <header role="banner" className="banner">
        <article className="banner-group">
          <div className="app-title-container">
            <img
              className="landing-page-icon"
              src={logo}
              alt={"tag-a-log icon"}
            />
            <h1 className="app-title">Tag-A-Log</h1>
          </div>
          <h3 className="app-desc">
            - An information, bookmarks and log manager that allows users to
            store urls, code snippets or articles notes with appropriate
            description and "tag" them for categorization and fast searching for
            easier log management.
          </h3>
          <div className="app-info-wrapper">
            <h2 className="left-header">"What's a Log?"</h2>
            <p>
              - A <span style={{ color: "#7cc576" }}>Log</span> can be a website
              you want to bookmark, but you don't want to forget why you
              bookmark it. An article you found, but you only need a paragraph
              of and still be able to save the url incase you want to read the
              whole thing.
            </p>
            <h2 className="right-header">"What's a Tag?"</h2>
            <p>
              - A <span style={{ color: "#f68e56" }}>Tag</span> is a label or 1
              word summary you put on your Log to categorize it for quick
              searching. It can be an easy word to remember that you can
              associate with the log that you created.
            </p>
          </div>
        </article>
      </header>
      <article className="how-to-article">
        <h2 className="article-header">How to use?</h2>
        <div className="button-container">
          <h3 className="left-header">Create an account</h3>
          <button
            id="signup"
            className="form-btn signUp"
            onClick={() => {
              setActive("signUp");
              setError(null);
            }}
          >
            Sign Up
          </button>
          {active === "signUp" && (
            <SignUp
              className={active}
              handleSubmit={(e) => handleRegisterNewUser(e)}
            />
          )}
        </div>
        <div className="right-arrow-container">
          <img className="right-pointing" src={arrow} alt={"arrow-icon"} />
          <h3 className="right-header">Click Create Log Button</h3>
        </div>
        <div>
          <div className="p-icon-container">
            <p>Once youre in, Find and Click this button: =></p>
            <img
              className="landing-page-icon"
              src={logo}
              alt={"tag-a-log icon"}
            />
          </div>
        </div>
        <div className="left-arrow-container">
          <img className="left-pointing" src={arrow} alt={"arrow-icon"} />
          <h3 className="left-header">Make your Log!</h3>
        </div>
        <div>
          <p>Simply fill in the form:</p>
          <ul>
            <li>
              Name: A good Log Name, can be the title of the article, a summary
              or name of the webpage.
            </li>
            <li>
              Info: A write brief description of what Log you are saving, copy
              paste a paragraph in the article or a code snippets.
            </li>
          </ul>
          <img
            className="how-to-image"
            src={mobile}
            alt={"create a log image"}
          />
        </div>
        <div className="right-arrow-container">
          <img className="right-pointing" src={arrow} alt={"arrow-icon"} />
          <h3 className="right-header">Don't forget to Tag-A-Log, or don't.</h3>
        </div>
        <div>
          <img className="how-to-image" src={addTag} alt={"add a tag image"} />
        </div>
        <div className="left-arrow-container">
          <img className="left-pointing" src={arrow} alt={"arrow-icon"} />
          <h3 className="left-header">Congrats!! You've made your log!</h3>
        </div>
        <div></div>
      </article>
      <article className="what-now-article">
        <h2 className="article-header">What now?</h2>
        <h3 className="left-header">You can forget it about!</h3>
        <p>
          If you need to find if again, you can use the search feature on the
          dashboard.
        </p>
        <ul>
          <li>Find A Log by the Log's name.</li>
          <li>Find A Log by Tag.</li>
          <li>Sort it by which was created first or the lastest.</li>
        </ul>

        <h3 className="right-header">Check out your Profile Page</h3>
        <ul>
          <li>
            If you need to see all your Logs without a search, you can see them
            here.
          </li>
          <li>You can check all your Tags here as well.</li>
          <li>
            You can delete your Logs or Tags without having to go on each Log to
            delete them.
          </li>
        </ul>
      </article>
      <article className="button-container">
        <h2 className="article-header">Login</h2>
        <button
          id="login"
          className="form-btn logIn"
          onClick={() => {
            setActive("logIn");
            setError(null);
          }}
        >
          Login
        </button>
        {active === "logIn" && <LogIn handleSubmit={(e) => handleLogin(e)} />}
      </article>
      <div role="alert" className="error-wrapper">
        {error && <p className="error-message">{error}</p>}
      </div>
    </section>
  );
}

export default LandingPage;
