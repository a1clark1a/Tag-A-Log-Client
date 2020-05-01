import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import SortBy from "./SortBy";

it(`renders without crashing`, () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <BrowserRouter>
      <SortBy />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
