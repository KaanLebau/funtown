import { render, screen, act, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { RecoilRoot } from "recoil";
import { BrowserRouter } from "react-router-dom";
import RecuiterWorkplanePresenter from "../../presenters/recruiterWorkPlanePresenter/RecruiterWorkPlanePresenter";

const mockApplicants = [
  {
    id: 1,
    fullName: "Jhon Doe",
    experience: 1.2,
    position: "ticket sales",
    fromDate: "2022-01-01",
    toDate: "2022-01-11",
    status: "accepted",
  },
  {
    id: 2,
    fullName: "jane Doe",
    experience: 1.2,
    position: "ticket sales",
    fromDate: "2022-02-01",
    toDate: "2022-02-11",
    status: "rejected",
  },
];

describe("Recuiter workplane presenter render", () => {
  test("componenets correctly", () => {
    render(
      <RecoilRoot>
        <BrowserRouter>
          <RecuiterWorkplanePresenter />
        </BrowserRouter>
      </RecoilRoot>
    );
    expect(screen.getByTestId("table-presenter")).toBeInTheDocument();
    expect(
      screen.getByTestId("detailed-application-presenter")
    ).toBeInTheDocument();
  });
  test("headers correctly", () => {
    render(
      <RecoilRoot>
        <BrowserRouter>
          <RecuiterWorkplanePresenter />
        </BrowserRouter>
      </RecoilRoot>
    );
    expect(
      screen.getByTestId("detailed-application-no-data-icon")
    ).toBeInTheDocument();
  });
  test("updates all job applications correctly", () => {
    render(
      <RecoilRoot>
        <BrowserRouter>
          <RecuiterWorkplanePresenter applicants={mockApplicants} />
        </BrowserRouter>
      </RecoilRoot>
    );
    expect(
      screen.getByTestId("detailed-application-no-data-icon")
    ).toBeInTheDocument();
  });

  test("handleSelectedApplicant updates detailed state correctly", async () => {
    render(
      <RecoilRoot>
        <BrowserRouter>
          <RecuiterWorkplanePresenter applicants={mockApplicants} />
        </BrowserRouter>
      </RecoilRoot>
    );

    await act(async () => {
      await userEvent.click(screen.getByTestId("row-id-1"));
    });

    await waitFor(() => {
      expect(
        screen.getByTestId("detailed-application-view-fullname")
      ).toHaveTextContent("Name: Jhon Doe");
    });
  });
});
