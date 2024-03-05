import { render, screen, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import { RecoilRoot } from "recoil";
import { BrowserRouter } from "react-router-dom";
import RecruiterPage from "../../pages/recruiterPage/RecruiterPage";

describe("Recruiter in page renders", () => {
  test("componenets correctly", () => {
    render(
      <RecoilRoot>
        <BrowserRouter>
          <RecruiterPage />
        </BrowserRouter>
      </RecoilRoot>
    );
    expect(screen.getByTestId("recruiter-page")).toBeInTheDocument();
  });
});
