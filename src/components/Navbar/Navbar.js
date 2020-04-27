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
        <h2>Dashboard</h2>
      </Link>

      <Link to={"/profilepage"} onClick={smoothScrollToTop()}>
        <h2>Profile</h2>
      </Link>

      <Link onClick={handleLogOut} to={"/"}>
        <h2>Log Out</h2>
      </Link>
    </nav>
  );
}

export default Navbar;
