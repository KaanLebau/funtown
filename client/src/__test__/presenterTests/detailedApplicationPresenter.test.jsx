import React from "react";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DetailedApplicationPresenter from "../../presenters/detailedApplicationPresenter/DetailedApplicationPresenter";
import "@testing-library/jest-dom";
import { RecoilRoot } from "recoil";

const sampleApplication = {
  id: 1,
  fullName: "John Doe",
  experience: 1.2,
  position: "ticket sales",
  fromDate: "2022-01-01",
  toDate: "2022-01-11",
  status: "accepted",
};

const updatedApplication = {
  id: 1,
  fullName: "John Doe",
  experience: 1.2,
  position: "roller coaster operation",
  fromDate: "2022-01-01",
  toDate: "2022-01-11",
  status: "unhandled",
};

const statusList = ["accepted", "rejected", "unhandled"];

xdescribe("DetailedApplicationPresenter component", () => {
  xtest("toggles editing mode when edit button is clicked", () => {
    render(
      <RecoilRoot>
        <DetailedApplicationPresenter theApplicant={sampleApplication} />
      </RecoilRoot>
    );

    expect(screen.getByTestId("detailed-application-view")).toBeInTheDocument();
  });
});
