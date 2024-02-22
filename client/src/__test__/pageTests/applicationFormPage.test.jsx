import ApplicationFormPage from "../../pages/applicationFormPage/ApplicationFormPage";
import { render, screen, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import { RecoilRoot } from "recoil";
import { BrowserRouter } from "react-router-dom";

describe("ApplicationFormPage Component", () => {
  test("renders ApplicationFormPage component", () => {
    render(
      <BrowserRouter>
        <RecoilRoot>
          <ApplicationFormPage />
        </RecoilRoot>
      </BrowserRouter>
    );
    expect(screen.getByTestId("application-form-page")).toBeInTheDocument();
  });
});
