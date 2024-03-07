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
});
