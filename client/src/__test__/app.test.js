import React from "react";
import App from "../App";
import { render, screen, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import { RecoilRoot } from "recoil";
import { BrowserRouter } from "react-router-dom";

describe("App renders", () => {
  test("welcome pages correctly", () => {
    render(
      <RecoilRoot>
        <App />
      </RecoilRoot>
    );
    expect(screen.getByTestId("welcome-page")).toBeInTheDocument();
  });
});
