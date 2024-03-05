import React from "react";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import LoginPresenter from "../../presenters/loginPresenter/LoginPresenter";
import { RecoilRoot } from "recoil";
import { BrowserRouter } from "react-router-dom";

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

// Mocking the API module
jest.mock("../../integration/funtownApi", () => ({
  authenticate: jest.fn(),
}));

xdescribe("Login presenter", () => {
  test("calls setUser when login is successful", async () => {
    const mockUser = { id: 1, username: "testuser" };
    // Mocking the successful authentication

    const setState = jest.fn();
    jest
      .spyOn(React, "useState")
      .mockImplementation((initialState) => [initialState, setState]);
    require("../../integration/funtownApi").authenticate.mockResolvedValue(
      mockUser
    );

    render(
      <BrowserRouter>
        <RecoilRoot>
          <LoginPresenter />
        </RecoilRoot>
      </BrowserRouter>
    );

    await act(async () => {
      await userEvent.type(screen.getByTestId("input-username"), "testuser");
      await userEvent.type(
        screen.getByTestId("input-password"),
        "testpassword"
      );
      await userEvent.click(screen.getByTestId("button-submit"));
    });

    // Wait for the login process to finish
    await act(async () => {});

    // Assert that setUser is called with the correct user data
    expect(setState).toHaveBeenCalledWith(mockUser);
    // Assert that navigation occurred
    expect(navigate).toHaveBeenCalledWith("/dashboard");
  });

  test("does not call setUser when login fails", async () => {
    // Mocking the failed authentication
    require("../../integration/funtownApi").authenticate.mockRejectedValue(
      new Error("Invalid credentials")
    );

    render(
      <BrowserRouter>
        <RecoilRoot>
          <LoginPresenter />
        </RecoilRoot>
      </BrowserRouter>
    );

    await act(async () => {
      await userEvent.type(screen.getByTestId("input-username"), "testuser");
      await userEvent.type(
        screen.getByTestId("input-password"),
        "testpassword"
      );
      await userEvent.click(screen.getByTestId("button-submit"));
    });
    // Simulate user input and login action

    // Wait for the login process to finish
    await act(async () => {});

    // Assert that setUser is not called
    expect(require("react").useState()[1]).not.toHaveBeenCalled();
    // Assert that navigation did not occur
    expect(navigate).not.toHaveBeenCalled();
  });
});
