import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { RecoilRoot } from "recoil";
import ScheduleView from "../../views/scheduleView/ScheduleView";

describe("ScheduleView", () => {
  const recruiterProps = {
    role: "RECRUITER",
    availability: [
      {
        id: 1,
        position: "ticket sales",
        status: "accepted",
        from: "2024-02-01",
        to: "2024-02-03",
      },
      {
        id: 2,
        position: "Lotterie",
        status: "accepted",
        from: "2024-02-05",
        to: "2024-02-07",
      },
    ],
  };

  const userProps = {
    role: "USER",
    availability: [
      {
        id: 3,
        position: "ticket sales",
        status: "accepted",
        from: "2024-02-10",
        to: "2024-02-12",
      },
      {
        id: 4,
        position: "roller coaster operation",
        status: "accepted",
        from: "2024-02-15",
        to: "2024-02-17",
      },
    ],
  };

  test("renders correct title for recruiter", () => {
    render(
      <RecoilRoot>
        <ScheduleView {...recruiterProps} />
      </RecoilRoot>
    );

    expect(screen.getByTestId("schedule-view-title")).toHaveTextContent(
      "Schedule for current assigned positions"
    );
  });
  test("renders correct title for aplicant", () => {
    render(
      <RecoilRoot>
        <ScheduleView {...userProps} />
      </RecoilRoot>
    );

    expect(screen.getByTestId("schedule-view-title")).toHaveTextContent(
      "Your schedule"
    );
  });
});
