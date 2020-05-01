import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import ProfilePage from "./ProfilePage";

it(`renders without crashing`, () => {
  const div = document.createElement("div");

  ReactDOM.render(
    <BrowserRouter>
      <ProfilePage />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
