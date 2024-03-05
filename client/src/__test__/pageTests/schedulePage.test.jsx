import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import SchedulePage from "../../pages/schedulePage/SchedulePage";
import "@testing-library/jest-dom";
import mockApi from "../../integration/mockapi";

jest.mock("../../integration/mockapi");

const mockNavigate = jest.fn(); // Mock useNavigate function

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("SchedulePage Component", () => {
  test("renders loading state initially", async () => {
    render(
      <RecoilRoot>
        <BrowserRouter>
          <SchedulePage />
        </BrowserRouter>
      </RecoilRoot>
    );
    await waitFor(() => {
      expect(screen.getByTestId("schedule-page-loading")).toBeInTheDocument();
    });
  });

  test("fetches data and renders schedule view", async () => {
    const applications = [{ id: 1, title: "Test Application" }];
    mockApi.getAllApplications.mockResolvedValue(applications);

    render(
      <RecoilRoot>
        <BrowserRouter>
          <SchedulePage />
        </BrowserRouter>
      </RecoilRoot>
    );

    await waitFor(() => {
      expect(mockApi.getAllApplications).toHaveBeenCalledTimes(1);
    });

    await waitFor(() => {
      expect(screen.getByTestId("schedule-view-wrapper")).toBeInTheDocument();
    });
  });
  test("navigates to notification page on error", async () => {
    const error = new Error("Failed to fetch data");
    error.code = 500; // Mock error code
    mockApi.getAllApplications.mockRejectedValue(error);

    render(
      <RecoilRoot>
        <BrowserRouter>
          <SchedulePage />
        </BrowserRouter>
      </RecoilRoot>
    );

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/notification", {
        replace: true,
        state: { redirect: "/user/dashboard", code: 500 },
      });
    });
  });
});
