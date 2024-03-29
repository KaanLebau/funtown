import { render, screen, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import UserPage from "../../pages/userPage/UserPage";
import { RecoilRoot } from "recoil";

describe("Log in page renders", () => {
  test("componenets correctly", () => {
    render(
      <RecoilRoot>
        <UserPage />
      </RecoilRoot>
    );
    expect(screen.getByTestId("user-page")).toBeInTheDocument();
  });
});
