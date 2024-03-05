import { render, screen, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import { RecoilRoot } from "recoil";
import { BrowserRouter } from "react-router-dom";
import NotFoundPage from "../../pages/notFoundPage/NotFoundPage";

describe("Not found page renders", () => {
  test("componenets correctly", () => {
    render(
      <RecoilRoot>
        <BrowserRouter>
          <NotFoundPage />
        </BrowserRouter>
      </RecoilRoot>
    );
    expect(screen.getByTestId("not-found")).toBeInTheDocument();
    expect(screen.getByTestId("not-found-page")).toBeInTheDocument();
    expect(screen.getByTestId("info-text")).toBeInTheDocument();
    expect(screen.getByTestId("info-path")).toBeInTheDocument();
    expect(screen.getByTestId("info-code")).toBeInTheDocument();
  });
});
