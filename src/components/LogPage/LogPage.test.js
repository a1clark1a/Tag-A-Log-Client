import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import LogPage from "./Logpage";

it(`renders without crashing`, () => {
  const div = document.createElement("div");
  const props = {
    match: { params: { logId: 1 } },
    history: {
      push: () => {},
    },
  };
  ReactDOM.render(
    <BrowserRouter>
      <LogPage {...props} />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
