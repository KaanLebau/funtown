import React from "react";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import LoginPresenter from "../../presenters/loginPresenter/LoginPresenter";
import { RecoilRoot } from "recoil";
import { BrowserRouter } from "react-router-dom";
import * as router from "react-router";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(), // Mocking useNavigate hook
}));

const navigate = jest.fn();
beforeEach(() => {
  jest.clearAllMocks(); // Clear mock calls between tests
  jest
    .spyOn(require("react-router-dom"), "useNavigate")
    .mockReturnValue(navigate);
});

describe("Login presenter renders", () => {
  test("renders login view component", () => {
    render(
      <BrowserRouter>
        <RecoilRoot>
          <LoginPresenter />
        </RecoilRoot>
      </BrowserRouter>
    );

    expect(screen.getByTestId("login-view")).toBeInTheDocument();
  });
  test("redirect to user page", async () => {
    render(
      <BrowserRouter>
        <RecoilRoot>
          <LoginPresenter />
        </RecoilRoot>
      </BrowserRouter>
    );
    const credential = { role: "applicant" };

    await act(async () => {
      userEvent.type(screen.getByTestId("input-username"), "testUser");
      userEvent.type(screen.getByTestId("input-password"), "testPassword");
      userEvent.click(screen.getByTestId("button-submit"));
    });

    expect(navigate).toHaveBeenCalledTimes(1);
    expect(navigate).toHaveBeenCalledWith("/user");
  });
  test("redirect to recruiter page", async () => {
    render(
      <BrowserRouter>
        <RecoilRoot>
          <LoginPresenter />
        </RecoilRoot>
      </BrowserRouter>
    );
    const credential = { role: "applicant" };

    await act(async () => {
      userEvent.type(screen.getByTestId("input-username"), "admin");
      userEvent.type(screen.getByTestId("input-password"), "testPassword");
      userEvent.click(screen.getByTestId("button-submit"));
    });

    expect(navigate).toHaveBeenCalledTimes(1);
    expect(navigate).toHaveBeenCalledWith("/recruiter");
  });
});
