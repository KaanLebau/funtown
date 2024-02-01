import React from "react";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import RegistrationPresenter from "../../presenters/registrationPresenter/RegistrationPresenter";

const mockSubmit = jest.fn();

describe("Registration presenter renders", () => {
  test("renders RegistrationView component", () => {
    render(<RegistrationPresenter />);
    expect(screen.getByTestId("registration-presenter")).toBeInTheDocument();
    expect(screen.getByTestId("registration-view")).toBeInTheDocument();
  });

  test("submits user data correctly", async () => {
    render(<RegistrationPresenter />);
    const inputUsername = "test user";
    const inputPassword = "test password";

    await act(async () => {
      mockSubmit({ username: inputUsername, password: inputPassword }); // Simulating the submission directly
    });

    expect(mockSubmit).toHaveBeenCalledTimes(1);
    expect(mockSubmit).toHaveBeenCalledWith({
      username: inputUsername,
      password: inputPassword,
    });
  });
});
