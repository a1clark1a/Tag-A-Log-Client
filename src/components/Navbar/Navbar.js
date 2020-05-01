import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import TokenService from "../../service/token-service";

import "./Navbar.css";

function Navbar() {
  const [active, setActive] = useState("");

  useEffect(() => {
    setActive(window.location.pathname);
  }, [active]);
  const smoothScrollToTop = () => {
    window.scroll({ top: 0, left: 0, behavior: "smooth" });
  };

  const handleLogOut = () => {
    TokenService.clearAuthToken();
  };

  return (
    <nav>
      <Link
        className={active === "/dashboard" ? "active" : ""}
        to={"/dashboard"}
        onClick={smoothScrollToTop()}
      >
        <h2>Dashboard</h2>
      </Link>

      <Link
        className={active === "/profilepage" ? "active" : ""}
        to={"/profilepage"}
        onClick={smoothScrollToTop()}
      >
        <h2>Profile</h2>
      </Link>

      <Link onClick={handleLogOut} to={"/"}>
        <h2>Log Out</h2>
      </Link>
    </nav>
  );
}

export default Navbar;
