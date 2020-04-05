import React from "react";
import { Link } from "react-router-dom";

import "./Navbar.css";

function Navbar() {
  const smoothScrollToTop = () => {
    window.scroll({ top: 0, left: 0, behavior: "smooth" });
  };
  return (
    <nav>
      <Link to={"/dashboard"} onclick={smoothScrollToTop()}>
        Dashboard
      </Link>

      <Link to={"/profilepage"} onclick={smoothScrollToTop()}>
        Profile
      </Link>

      <Link to={"/"}>Log Out</Link>
    </nav>
  );
}

export default Navbar;
