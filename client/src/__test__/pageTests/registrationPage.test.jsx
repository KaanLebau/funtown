import { render, screen, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import RegistrationPage from "../../pages/registerPage/RegistrationPage";
import { RecoilRoot } from "recoil";
import { BrowserRouter } from "react-router-dom";

describe("Registration page renders", () => {
  test("componenets correctly", () => {
    render(
      <RecoilRoot>
        <BrowserRouter>
          <RegistrationPage />
        </BrowserRouter>
      </RecoilRoot>
    );
    expect(screen.getByTestId("registration-page")).toBeInTheDocument();
    expect(
      screen.getByTestId("registration-page-presenter-wrapper")
    ).toBeInTheDocument();
  });
});
