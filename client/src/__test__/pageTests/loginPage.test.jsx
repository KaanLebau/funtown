import { render, screen, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import LoginPage from "../../pages/loginPage/LoginPage";
import { RecoilRoot } from "recoil";
import { BrowserRouter } from "react-router-dom";

describe("Log in page renders", () => {
  test("componenets correctly", () => {
    render(
      <RecoilRoot>
        <BrowserRouter>
          <LoginPage />
        </BrowserRouter>
      </RecoilRoot>
    );
    expect(screen.getByTestId("head-presenter")).toBeInTheDocument();
    expect(screen.getByTestId("login-presenter")).toBeInTheDocument();
  });
});
