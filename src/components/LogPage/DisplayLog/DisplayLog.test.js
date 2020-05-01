import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import DisplayLog from "./DisplayLog";

describe("DisplayLog component", () => {
  const props = {
    log: {
      id: 1,
      log_name: "test",
    },
    tag_list: [],
    onClick: () => {},
    onDelete: () => {},
    history: {
      push: () => {},
    },
  };
  it(`renders without crashing`, () => {
    const div = document.createElement("div");

    ReactDOM.render(
      <BrowserRouter>
        <DisplayLog {...props} />
      </BrowserRouter>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
});
