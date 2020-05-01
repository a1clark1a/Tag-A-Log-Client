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

        if (res) {
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
    setError(null);
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
        <button className="special-button" onClick={demo}>
          Demo
        </button>
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
              - A <span className={"landing-log"}>Log</span> can be a website
              you want to bookmark, but you don't want to forget why you
              bookmark it. It can be an article you found, but you only need a
              paragraph of it yet still be able to save the url incase you want
              to read the whole thing.
            </p>
            <h2 className="right-header">"What's a Tag?"</h2>
            <p>
              - A <span className="landing-tag">Tag</span> is a label or 1 word
              summary you put on your
              <span className="landing-log"> Log </span> to categorize it for
              quick searching. It can be an easy word to remember that you can
              associate with the <span className="landing-log">Log </span>that
              you created.
            </p>
          </div>
        </article>
      </header>
      <article className="how-to-article" id="signup">
        <h2 className="article-header">How to use?</h2>
        <div className="button-container">
          <h3 className="left-header">Create an account</h3>
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
            <SignUp
              className={active}
              handleSubmit={(e) => handleRegisterNewUser(e)}
            />
          )}
          <div role="alert" className="error-wrapper">
            {error && <p className="error-message">{error}</p>}
          </div>
        </div>
        <div>
          <div className="right-arrow-container">
            <img className="right-pointing" src={arrow} alt={"arrow-icon"} />
            <h3 className="right-header">Click Create Log button</h3>
          </div>

          <div className="p-icon-container">
            <p>
              <span>Once you're in the Dashboard, </span>
              Find and Click this button:{" "}
            </p>
            <img
              className="landing-page-icon"
              src={logo}
              alt={"tag-a-log icon"}
            />
          </div>
        </div>

        <div>
          <div className="left-arrow-container">
            <img className="left-pointing" src={arrow} alt={"arrow-icon"} />
            <h3 className="left-header">
              Make your <span className="landing-log"> Log!</span>
            </h3>
          </div>
          <ul>
            <li>
              <span style={{ fontWeight: "700" }}>Name:</span> A good
              <span className="landing-log"> Log</span> Name, can be the title
              of the article, a summary or name of a webpage.
            </li>
            <li>
              <span style={{ fontWeight: "700" }}>Info:</span> Write a brief
              description of what <span className="landing-log">Log</span> you
              are making, you can copy and paste a paragraph of an article or a
              code snippet in here.
            </li>
          </ul>
          <img className="how-to-image" src={mobile} alt={"create a log"} />
        </div>

        <div>
          <div className="right-arrow-container">
            <img className="right-pointing" src={arrow} alt={"arrow-icon"} />
            <h3 className="right-header" style={{ marginLeft: "1rem" }}>
              Don't forget to Tag-A-Log, or don't.
            </h3>
          </div>
          <img className="how-to-image" src={addTag} alt={"add a tag "} />
        </div>

        <div className="left-arrow-container">
          <img className="left-pointing" src={arrow} alt={"arrow-icon"} />
          <h3 className="left-header congrats">
            Congrats!! You've made a <span className="landing-log">Log</span>!
          </h3>
        </div>
      </article>
      <article className="what-now-article">
        <div>
          <h2 className="article-header">What now?</h2>
          <h3 className="left-header">You can forget about it!</h3>
          <p>
            If you need to find it again, you can use the search feature on the
            dashboard.
          </p>
          <ul>
            <li>
              Find A <span className="landing-log">Log</span> by the
              <span className="landing-log"> Log's</span> name.
            </li>
            <li>
              Find A <span className="landing-log">Log</span> by{" "}
              <span className="landing-tag">Tag</span>.
            </li>
            <li>Sort it by which was created first or the lastest.</li>
          </ul>

          <h3 className="right-header">Check out your Profile Page</h3>
          <ul>
            <li>
              If you need to see all your{" "}
              <span className="landing-log">Logs</span> without a search, you
              can see them here.
            </li>
            <li>
              You can check all your <span className="landing-tag">Tags</span>{" "}
              here as well.
            </li>
            <li>
              You can delete your <span className="landing-log">Logs</span> or
              <span className="landing-tag"> Tags</span> without having to go on
              each <span className="landing-log">Log</span> to delete them.
            </li>
          </ul>
        </div>
      </article>
      <article className="button-container">
        <h2 id="login" className="article-header">
          Login
        </h2>
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
      </article>
      <div role="alert" className="error-wrapper">
        {error && <p className="error-message">{error}</p>}
      </div>
    </section>
  );
}

export default LandingPage;
