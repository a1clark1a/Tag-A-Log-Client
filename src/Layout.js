import React from "react";
import { useLocation } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";

function Layout(props) {
  const location = useLocation();
  return (
    <main className="App">
      {location.pathname !== "/" && <Navbar />}
      {props.children}
    </main>
  );
}

export default Layout;
