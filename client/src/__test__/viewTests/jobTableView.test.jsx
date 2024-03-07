import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { RecoilRoot } from "recoil";
import JobTableView from "../../views/jobTableView/JobTableView";

describe("JobTableView", () => {
  const recruiterProps = {
    role: "RECRUITER",
    rows: [],
    columns: [],
  };

  const applicantProps = {
    role: "APPLICANT",
    rows: [
      { id: 1, name: "Job 1" },
      { id: 2, name: "Job 2" },
    ],
    columns: [{ field: "name", headerName: "Job Name" }],
  };

  test("renders no data icon and message when rows are empty", () => {
    render(
      <RecoilRoot>
        <JobTableView rows={[]} />
      </RecoilRoot>
    );

    expect(
      screen.getByTestId("job-table-view-no-data-icon")
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("job-table-view-no-data-msg")
    ).toBeInTheDocument();
  });
  test("applicant", () => {
    render(
      <RecoilRoot>
        <JobTableView {...applicantProps} />
      </RecoilRoot>
    );

    expect(screen.getByTestId("job-table-view-title")).toBeInTheDocument();
  });
  test("recruiter", () => {
    render(
      <RecoilRoot>
        <JobTableView {...recruiterProps} />
      </RecoilRoot>
    );

    expect(screen.getByTestId("job-table-view-title")).toBeInTheDocument();
  });
});
