import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import CreateLog from "./CreateLog";

it(`renders without crashing`, () => {
  const div = document.createElement("div");
  const props = {
    log_name: "test",
    url: "",
    description: "test-description",
    num_tags: 0,
    edit: false,
    handleEditLog: () => {},
    handleCreateLog: () => {},
    currentTags: [],
  };
  ReactDOM.render(
    <BrowserRouter>
      <CreateLog {...props} />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
