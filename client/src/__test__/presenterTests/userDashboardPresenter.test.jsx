import React from "react";
import { render, screen, waitFor, act } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

import UserDashboardPresenter from "../../presenters/userDashboardPresenter/UserDashboardPresenter";

describe("User dashboard presenter", () => {
  const mockUser = {
    id: 1,
    firstName: "jhon",
    lastName: "doe",
    experience: [],
    availability: [],
    role: "user",
  };

  test("renders without crashing", () => {
    render(
      <RecoilRoot>
        <UserDashboardPresenter user={mockUser} />
      </RecoilRoot>
    );
    expect(screen.getByTestId("user-dashboard-presenter")).toBeInTheDocument();
  });
});
