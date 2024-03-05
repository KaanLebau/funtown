import { render, screen, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import RegistrationPage from "../../pages/registerPage/RegistrationPage";
import { RecoilRoot } from "recoil";

xdescribe("Registration page renders", () => {
  test("componenets correctly", () => {
    render(
      <RecoilRoot>
        <RegistrationPage />
      </RecoilRoot>
    );
    expect(screen.getByTestId("head-presenter")).toBeInTheDocument();
    expect(screen.getByTestId("registration-presenter")).toBeInTheDocument();
  });
});
