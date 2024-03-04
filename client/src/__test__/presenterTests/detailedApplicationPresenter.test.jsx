import React from "react";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DetailedApplicationPresenter from "../../presenters/detailedApplicationPresenter/DetailedApplicationPresenter";
import "@testing-library/jest-dom";
import { RecoilRoot } from "recoil";
import { statusOptions } from "../../model/businessModel";

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

describe("DetailedApplicationPresenter component", () => {
  test("toggles editing mode when edit button is clicked", () => {
    render(
      <RecoilRoot initializeState={({ set }) => set(statusOptions, statusList)}>
        <DetailedApplicationPresenter theApplicant={sampleApplication} />
      </RecoilRoot>
    );

    expect(screen.getByTestId("detailed-application-view")).toBeInTheDocument();
  });
  test("toggles editing state when edit button is clicked", () => {
    render(
      <RecoilRoot initializeState={({ set }) => set(statusOptions, statusList)}>
        <DetailedApplicationPresenter theApplicant={sampleApplication} />
      </RecoilRoot>
    );

    const editButton = screen.getByText("Edit");
    userEvent.click(editButton);

    expect(screen.getByTestId("status-select-element")).toBeInTheDocument();
    expect(screen.getByTestId("cancel-icon")).toBeInTheDocument();
  });

  test("cancels editing state when cancel button is clicked", () => {
    render(
      <RecoilRoot initializeState={({ set }) => set(statusOptions, statusList)}>
        <DetailedApplicationPresenter theApplicant={sampleApplication} />
      </RecoilRoot>
    );

    const editButton = screen.getByText("Edit");
    userEvent.click(editButton);

    const cancelButton = screen.getByText("Cancel");
    userEvent.click(cancelButton);

    expect(
      screen.queryByTestId("status-select-element")
    ).not.toBeInTheDocument();
    expect(screen.queryByTestId("cancel-icon")).not.toBeInTheDocument();
  });
});
