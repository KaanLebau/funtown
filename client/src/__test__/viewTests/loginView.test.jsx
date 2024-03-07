import React from "react";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import LoginPage from "../../views/loginView/LoginView";
import { RecoilRoot } from "recoil";
import { BrowserRouter } from "react-router-dom";
const mockSubmit = jest.fn();

describe("Job application view renders", () => {
  test("labels correctly", () => {
    render(
      <RecoilRoot>
        <BrowserRouter>
          <LoginPage />
        </BrowserRouter>
      </RecoilRoot>
    );
    expect(screen.getByText("Username:")).toBeInTheDocument();
    expect(screen.getByText("Password:")).toBeInTheDocument();
  });
  test("button correctly", () => {
    render(
      <RecoilRoot>
        <BrowserRouter>
          <LoginPage />
        </BrowserRouter>
      </RecoilRoot>
    );
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  test("error messages correctly", async () => {
    render(
      <RecoilRoot>
        <BrowserRouter>
          <LoginPage />
        </BrowserRouter>
      </RecoilRoot>
    );
    const userInteract = screen.getByRole("button");

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      await userEvent.click(userInteract);
    });

    expect(screen.getByTestId("userNameErr")).not.toBe(null);
    expect(screen.getByTestId("userNameErr")).toHaveTextContent(
      "Username required!"
    );

    expect(screen.getByTestId("passwordErr")).not.toBe(null);
    expect(screen.getByTestId("passwordErr")).toHaveTextContent(
      "Password required!"
    );
  });

  test("user input correctly", async () => {
    render(
      <RecoilRoot>
        <BrowserRouter>
          <LoginPage login={mockSubmit} />
        </BrowserRouter>
      </RecoilRoot>
    );
    const userInteract = screen.getByTestId("button-submit");
    const inputUsername = screen.getByTestId("input-username");
    const inputPassword = screen.getByTestId("input-password");

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      await userEvent.type(inputUsername, "test user");
      await userEvent.type(inputPassword, "test password");
      await userEvent.click(userInteract);
    });

    expect(mockSubmit).toHaveBeenCalledTimes(1);
    expect(mockSubmit).toHaveBeenCalledWith({
      username: "test user",
      password: "test password",
    });
  });
});
