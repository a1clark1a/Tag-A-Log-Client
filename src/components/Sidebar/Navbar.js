import React from "react";
import { Link } from "react-router-dom";

import "./Navbar.css";

function Navbar() {
  return (
    <nav>
      <div>
        <button>Dashboard</button>
      </div>
      <div>
        <button>Profile</button>
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
