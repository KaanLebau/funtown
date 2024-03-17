import React from "react";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import LoginPresenter from "../../presenters/loginPresenter/LoginPresenter";
import { RecoilRoot } from "recoil";
import { BrowserRouter } from "react-router-dom";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

const navigate = jest.fn();
beforeEach(() => {
  jest.clearAllMocks();
  jest
    .spyOn(require("react-router-dom"), "useNavigate")
    .mockReturnValue(navigate);
});

jest.mock("../../integration/funtownApi", () => ({
  authenticate: jest.fn(),
}));

describe("Login presenter", () => {
  test("renders without crashing", () => {
    render(
      <BrowserRouter>
        <RecoilRoot>
          <LoginPresenter />
        </RecoilRoot>
      </BrowserRouter>
    );
    expect(screen.getByTestId("login-presenter")).toBeInTheDocument();
  });
  /*
  test("calls setUser when login is successful", async () => {
    const mockUser = { id: 1, username: "testuser" };

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

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      await userEvent.type(screen.getByTestId("input-username"), "testuser");
      await userEvent.type(
        screen.getByTestId("input-password"),
        "testpassword"
      );
      await userEvent.click(screen.getByTestId("button-submit"));
    });

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {});

    expect(setState).toHaveBeenCalledWith(mockUser);
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

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      await userEvent.type(screen.getByTestId("input-username"), "testuser");
      await userEvent.type(
        screen.getByTestId("input-password"),
        "testpassword"
      );
      await userEvent.click(screen.getByTestId("button-submit"));
    });

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {});

    expect(require("react").useState()[1]).not.toHaveBeenCalled();
    expect(navigate).not.toHaveBeenCalled();
  });
  */
});
