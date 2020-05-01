import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import DisplayTagList from "./DisplayTagList";

describe("DisplayTagList component", () => {
  const props = {
    tag: {
      id: 1,
      tag_name: "test",
    },
    onDelete: () => {},
    currentPage: "",
    history: {
      push: () => {},
    },
  };
  it(`renders without crashing`, () => {
    const div = document.createElement("div");

    ReactDOM.render(
      <BrowserRouter>
        <DisplayTagList {...props} />
      </BrowserRouter>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
});
