import React from "react";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import LoginPage from "../../views/loginView/LoginView";

const mockSubmit = jest.fn();

describe("Job application view renders", () => {
  test("labels correctly", () => {
    render(<LoginPage />);
    expect(screen.getByText("Username:")).toBeInTheDocument();
    expect(screen.getByText("Password:")).toBeInTheDocument();
  });
  test("button correctly", () => {
    render(<LoginPage />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  test("error messages correctly", async () => {
    render(<LoginPage onSubmit={mockSubmit} />);
    const userInteract = screen.getByRole("button");

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
    render(<LoginPage login={mockSubmit} />);
    const userInteract = screen.getByTestId("button-submit");
    const inputUsername = screen.getByTestId("input-username");
    const inputPassword = screen.getByTestId("input-password");

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
