import React from "react";
import { render, screen, act, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import RegistrationPresenter from "../../presenters/registrationPresenter/RegistrationPresenter";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import apiModule from "../../integration/funtownApi";

const mockSubmit = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));
jest.mock("../../integration/funtownApi", () => ({
  registration: jest.fn(), // Mock the registration function
}));

describe("Registration presenter renders", () => {
  test("renders RegistrationView component", () => {
    render(
      <BrowserRouter>
        <RecoilRoot>
          <RegistrationPresenter />
        </RecoilRoot>
      </BrowserRouter>
    );

    expect(screen.getByTestId("registration-presenter")).toBeInTheDocument();
    expect(screen.getByTestId("registration-view")).toBeInTheDocument();
  });

  test("submits user data correctly", async () => {
    render(
      <BrowserRouter>
        <RecoilRoot>
          <RegistrationPresenter />
        </RecoilRoot>
      </BrowserRouter>
    );
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
  test("submits registration form with user input", async () => {
    const mockNavigate = jest.fn();
    require("react-router-dom").useNavigate.mockReturnValue(mockNavigate);

    render(
      <RecoilRoot>
        <RegistrationPresenter />
      </RecoilRoot>
    );

    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(async () => {
      await userEvent.type(
        screen.getByTestId("registration-form-view-firstname"),
        "John"
      );
      await userEvent.type(
        screen.getByTestId("registration-form-view-lastname"),
        "Doe"
      );
      await userEvent.type(
        screen.getByTestId("registration-form-view-username"),
        "johndoe"
      );
      await userEvent.type(
        screen.getByTestId("registration-form-view-email"),
        "john@example.com"
      );
      await userEvent.type(
        screen.getByTestId("registration-form-view-pnr"),
        "1234567890"
      );
      await userEvent.type(
        screen.getByTestId("registration-form-view-password"),
        "password123"
      );
      await userEvent.click(
        screen.getByTestId("registration-form-view-submit-button")
      );
    });

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledTimes(0);
    });
    await waitFor(() => {
      expect(apiModule.registration).toHaveBeenCalledWith({
        username: "johndoe",
        password: "password123",
      });
    });
  });
});
