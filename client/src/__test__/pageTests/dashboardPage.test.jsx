import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router, useNavigate } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { currentUserState } from "../../model/userModel";
import DashboardPage from "../../pages/dashboardPage/DashboardPage";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

describe("DashboardPage Component", () => {
  const undefinedUser = {
    naturalId: "1",
    firstName: "Jhon",
    lastName: "Doe",
    username: "Jhonny",
    email: "jhon@doe.com",
    pnr: "11112233-4444",
    role: undefined,
    experience: [],
    availability: [],
  };
  const userAPPLICANT = {
    naturalId: "1",
    firstName: "Jhon",
    lastName: "Doe",
    username: "Jhonny",
    email: "jhon@doe.com",
    pnr: "11112233-4444",
    role: "APPLICANT", //"APPLICANT" & "RECRUITER"
    experience: [],
    availability: [],
  };
  const userRECRUITER = {
    naturalId: "1",
    firstName: "Jhon",
    lastName: "Doe",
    username: "Jhonny",
    email: "jhon@doe.com",
    pnr: "11112233-4444",
    role: "RECRUITER", //"APPLICANT" & "RECRUITER"
    experience: [],
    availability: [],
  };
  test('renders DashboardPage component with UserDashboardPresenter when role is "APPLICANT"', () => {
    render(
      <Router>
        <RecoilRoot
          initializeState={({ set }) => set(currentUserState, userAPPLICANT)}
        >
          <DashboardPage />
        </RecoilRoot>
      </Router>
    );

    expect(screen.getByTestId("dashboard-page")).toBeInTheDocument();
    expect(
      screen.getByTestId("user-dashboard-presenter-wraper")
    ).toBeInTheDocument();
  });

  test('renders DashboardPage component with RecruiterDashboardPresenter when role is "RECRUITER"', () => {
    render(
      <Router>
        <RecoilRoot
          initializeState={({ set }) => set(currentUserState, userRECRUITER)}
        >
          <DashboardPage />
        </RecoilRoot>
      </Router>
    );

    expect(screen.getByTestId("dashboard-page")).toBeInTheDocument();
    expect(
      screen.getByTestId("recruiter-dashboard-presenter-wraper")
    ).toBeInTheDocument();
  });
  test("renders notification page when role is undefined", () => {
    const mockNavigate = jest.fn();
    require("react-router-dom").useNavigate.mockReturnValue(mockNavigate);
    render(
      <Router>
        <RecoilRoot
          initializeState={({ set }) => set(currentUserState, undefinedUser)}
        >
          <DashboardPage />
        </RecoilRoot>
      </Router>
    );

    expect(mockNavigate).toHaveBeenCalledWith("/notification", {
      replace: true,
      state: { redirect: "/", code: 401 },
    });
  });
});
