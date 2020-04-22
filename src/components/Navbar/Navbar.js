import React from "react";
import { Link } from "react-router-dom";

import TokenService from "../../service/token-service";

import "./Navbar.css";

function Navbar() {
  const smoothScrollToTop = () => {
    window.scroll({ top: 0, left: 0, behavior: "smooth" });
  };

  const handleLogOut = () => {
    TokenService.clearAuthToken();
  };

  return (
    <nav>
      <Link to={"/dashboard"} onClick={smoothScrollToTop()}>
        Dashboard
      </Link>

      <Link to={"/profilepage"} onClick={smoothScrollToTop()}>
        Profile
      </Link>

      <Link onClick={handleLogOut} to={"/"}>
        Log Out
      </Link>
    </nav>
  );
}

export default Navbar;
