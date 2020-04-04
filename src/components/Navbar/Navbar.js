import React from "react";
import { Link } from "react-router-dom";

import "./Navbar.css";

function Navbar() {
  return (
    <nav>
      <div>
        <Link to={"/dashboard"}>
          <button>Dashboard</button>
        </Link>
      </div>
      <div>
        <Link to={"/ProfilePage"}>
          <button>Profile</button>
        </Link>
      </div>
      <div>
        <Link to={"/"}>
          <button>Log Out</button>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
