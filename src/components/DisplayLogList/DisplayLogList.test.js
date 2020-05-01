import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import DisplayLogList from "./DisplayLogList";

describe("DisplayLogList component", () => {
  const props = {
    log: {
      id: 1,
    },
    onDelete: () => {},
    currentPage: "",
    history: {
      push: () => {},
    },
  };

  const testArray = [
    {
      log: {
        id: 1,
        log_name: "test",
      },
    },
    {
      log: {
        id: 2,
        log_name: "log 2",
      },
    },
    {
      log: {
        id: 3,
        log_name: "log 3",
      },
    },
    {
      log: {
        id: 4,
        log_name: "log 4",
      },
    },
  ];

  it(`renders without crashing`, () => {
    const div = document.createElement("div");

    ReactDOM.render(
      <BrowserRouter>
        <DisplayLogList {...props} />
      </BrowserRouter>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });

  it(`renders an array without crashing`, () => {
    const div = document.createElement("div");

    const logList = testArray.map((elem, i) => {
      return (
        <div key={i}>
          <DisplayLogList
            log={elem}
            onDelete={props.onDelete}
            currentPage={""}
          />
        </div>
      );
    });

    ReactDOM.render(<BrowserRouter>{[logList]}</BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
