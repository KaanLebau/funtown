import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { RecoilRoot } from "recoil";
import UserInfoView from "../../views/userInfoView/UserInfoView";

describe("Head view renders", () => {
  const user = { firstName: "Jhon", lastName: "ozsan", username: "KKM" };
  test("componenets correctly", () => {
    render(
      <RecoilRoot>
        <UserInfoView user={user} />
      </RecoilRoot>
    );
    expect(screen.getByTestId("user-info-view")).toBeInTheDocument();
    expect(screen.getByTestId("avatar")).toBeInTheDocument();
    expect(screen.getByTestId("name-label")).toBeInTheDocument();
    expect(screen.getByTestId("name")).toBeInTheDocument();
    expect(screen.getByTestId("username-label")).toBeInTheDocument();
    expect(screen.getByTestId("username")).toBeInTheDocument();
    expect(screen.getByText("KKM")).toBeInTheDocument();
    expect(screen.getByText("JO")).toBeInTheDocument();
    expect(screen.getByText("Jhon ozsan")).toBeInTheDocument();
  });
});
