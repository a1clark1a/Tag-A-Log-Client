import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, useHistory } from "react-router-dom";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import LandingPage from "./LandingPage";

describe("Landing Page", () => {
  const props = {
    match: { params: {} },
  };

  it(`renders without crashing`, () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <BrowserRouter>
        <LandingPage />
      </BrowserRouter>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });

  it(`renders the page`, () => {
    const wrapper = shallow(
      <BrowserRouter>
        <LandingPage {...props} />
      </BrowserRouter>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
