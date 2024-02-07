import React from "react";
import { render, screen, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import DetailedApplicationView from "../../views/detailedApplicationView/DetailedApplicationView";

const mockEdit = jest.fn();
const mockSave = jest.fn();
const mockCancel = jest.fn();
const mockUpdateStatus = jest.fn();

const sampleApplication = {
  id: 1,
  fullName: "John Doe",
  experience: 1.2,
  position: "ticket sales",
  fromDate: "2022-01-01",
  toDate: "2022-01-11",
  status: "accepted",
};
const sampleApplication2 = {
  id: 1,
  fullName: "John Doe",
  experience: 1.2,
  position: "lotteries",
  fromDate: "2022-01-01",
  toDate: "2022-01-11",
  status: "rejected",
};
const sampleApplication3 = {
  id: 1,
  fullName: "John Doe",
  experience: 1.2,
  position: "roller coaster operation",
  fromDate: "2022-01-01",
  toDate: "2022-01-11",
  status: "unhandled",
};

const statusList = ["accepted", "rejected", "unhandled"];

describe("DetailedApplicationView component renders", () => {
  describe("selectPositionIcon", () => {
    test("function renders correct icon for 'roller coaster operation'", () => {
      const position = "roller coaster operation";
      render(
        <DetailedApplicationView
          application={{ position }}
          status={[]}
          editing={false}
          edit={() => {}}
          save={() => {}}
          cancel={() => {}}
          updateStatus={() => {}}
        />
      );

      expect(screen.getByTestId("roller-coaster-icon")).toBeInTheDocument();
    });
    test("function renders correct icon for 'ticket sales'", () => {
      const position = "ticket sales";
      render(
        <DetailedApplicationView
          application={{ position }}
          status={[]}
          editing={false}
          edit={() => {}}
          save={() => {}}
          cancel={() => {}}
          updateStatus={() => {}}
        />
      );

      expect(screen.getByTestId("ticket-sales-icon")).toBeInTheDocument();
    });
    test("function renders correct icon for 'lotteries'", () => {
      const position = "lotteries";
      render(
        <DetailedApplicationView
          application={{ position }}
          status={[]}
          editing={false}
          edit={() => {}}
          save={() => {}}
          cancel={() => {}}
          updateStatus={() => {}}
        />
      );

      expect(screen.getByTestId("lotteries-icon")).toBeInTheDocument();
    });
  });
  describe("icon", () => {
    test("ticket sales correctly", () => {
      render(
        <DetailedApplicationView
          application={sampleApplication}
          status={statusList}
          editing={false}
          edit={mockEdit}
          save={mockSave}
          cancel={mockCancel}
          updateStatus={mockUpdateStatus}
        />
      );
      expect(screen.getByTestId("ticket-sales-icon")).toBeInTheDocument();
    });
    test("lotteries correctly", () => {
      render(
        <DetailedApplicationView
          application={sampleApplication2}
          status={statusList}
          editing={false}
          edit={mockEdit}
          save={mockSave}
          cancel={mockCancel}
          updateStatus={mockUpdateStatus}
        />
      );
      expect(screen.getByTestId("lotteries-icon")).toBeInTheDocument();
    });
    test("roller coaster operation correctly", () => {
      render(
        <DetailedApplicationView
          application={sampleApplication3}
          status={statusList}
          editing={false}
          edit={mockEdit}
          save={mockSave}
          cancel={mockCancel}
          updateStatus={mockUpdateStatus}
        />
      );
      expect(screen.getByTestId("roller-coaster-icon")).toBeInTheDocument();
    });

    test("accepted correctly", () => {
      render(
        <DetailedApplicationView
          application={sampleApplication}
          status={statusList}
          editing={false}
          edit={mockEdit}
          save={mockSave}
          cancel={mockCancel}
          updateStatus={mockUpdateStatus}
        />
      );
      expect(screen.getByTestId("accepted-icon")).toBeInTheDocument();
    });

    test("rejected correctly", () => {
      render(
        <DetailedApplicationView
          application={sampleApplication2}
          status={statusList}
          editing={false}
          edit={mockEdit}
          save={mockSave}
          cancel={mockCancel}
          updateStatus={mockUpdateStatus}
        />
      );
      expect(screen.getByTestId("rejected-icon")).toBeInTheDocument();
    });
    test("unhandled correctly", () => {
      render(
        <DetailedApplicationView
          application={sampleApplication3}
          status={statusList}
          editing={false}
          edit={mockEdit}
          save={mockSave}
          cancel={mockCancel}
          updateStatus={mockUpdateStatus}
        />
      );
      expect(screen.getByTestId("unhandled-icon")).toBeInTheDocument();
    });
  });
  test("headers correctly", () => {
    render(
      <DetailedApplicationView
        application={sampleApplication}
        status={statusList}
        editing={false}
        edit={mockEdit}
        save={mockSave}
        cancel={mockCancel}
        updateStatus={mockUpdateStatus}
      />
    );
    expect(screen.getByTestId("componenet-header")).toBeInTheDocument();
    expect(screen.getByTestId("componenet-header")).toHaveTextContent(
      "Applicant Information:"
    );
  });
  test("applicant information correctly", () => {
    render(
      <DetailedApplicationView
        application={sampleApplication}
        status={statusList}
        editing={false}
        edit={mockEdit}
        save={mockSave}
        cancel={mockCancel}
        updateStatus={mockUpdateStatus}
      />
    );

    expect(screen.getByTestId("detailed-application-view")).toBeInTheDocument();
    expect(screen.getByText("Name: John Doe")).toBeInTheDocument();
    expect(screen.getByText("Experience: 1.2")).toBeInTheDocument();
    expect(screen.getByText("From: 2022-01-01")).toBeInTheDocument();
    expect(screen.getByText("To: 2022-01-11")).toBeInTheDocument();
    expect(screen.getByText("Accepted")).toBeInTheDocument(); // Assuming status is displayed correctly
    expect(screen.getByTestId("edit-icon")).toBeInTheDocument();
  });

  test("edit form when editing is true", () => {
    render(
      <DetailedApplicationView
        application={sampleApplication}
        status={statusList}
        editing={true}
        edit={mockEdit}
        save={mockSave}
        cancel={mockCancel}
        updateStatus={mockUpdateStatus}
      />
    );

    expect(screen.getByTestId("status-select-element")).toBeInTheDocument();
    expect(screen.getByTestId("save-icon")).toBeInTheDocument();
    expect(screen.getByTestId("cancel-icon")).toBeInTheDocument();
  });

  test("calls edit function when edit button is clicked", () => {
    render(
      <DetailedApplicationView
        application={sampleApplication}
        status={statusList}
        editing={false}
        edit={mockEdit}
        save={mockSave}
        cancel={mockCancel}
        updateStatus={mockUpdateStatus}
      />
    );

    userEvent.click(screen.getByTestId("edit-icon"));
    expect(mockEdit).toHaveBeenCalledTimes(1);
  });

  test("calls save function when save button is clicked", () => {
    render(
      <DetailedApplicationView
        application={sampleApplication}
        status={statusList}
        editing={true}
        edit={mockEdit}
        save={mockSave}
        cancel={mockCancel}
        updateStatus={mockUpdateStatus}
      />
    );

    userEvent.click(screen.getByTestId("save-icon"));
    expect(mockSave).toHaveBeenCalledTimes(1);
  });

  describe("DetailedApplicationView component calls updateStatus function when selecting", () => {
    test("rejected status", () => {
      const mockUpdateStatus = jest.fn();
      render(
        <DetailedApplicationView
          application={sampleApplication}
          status={statusList}
          updateStatus={mockUpdateStatus}
          editing={true}
        />
      );

      const selectElement = screen.getByTestId("status-select-element");

      userEvent.selectOptions(selectElement, "rejected");

      expect(mockUpdateStatus).toHaveBeenCalledTimes(1);
      expect(mockUpdateStatus).toHaveBeenCalledWith("rejected");
    });
    test("accepted status", () => {
      const mockUpdateStatus = jest.fn();
      render(
        <DetailedApplicationView
          application={sampleApplication}
          status={statusList}
          updateStatus={mockUpdateStatus}
          editing={true}
        />
      );

      const selectElement = screen.getByTestId("status-select-element");

      userEvent.selectOptions(selectElement, "accepted");

      expect(mockUpdateStatus).toHaveBeenCalledTimes(1);
      expect(mockUpdateStatus).toHaveBeenCalledWith("accepted");
    });
    test("unhandled status", () => {
      const mockUpdateStatus = jest.fn();
      render(
        <DetailedApplicationView
          application={sampleApplication}
          status={statusList}
          updateStatus={mockUpdateStatus}
          editing={true}
        />
      );

      const selectElement = screen.getByTestId("status-select-element");

      userEvent.selectOptions(selectElement, "unhandled");

      expect(mockUpdateStatus).toHaveBeenCalledTimes(1);
      expect(mockUpdateStatus).toHaveBeenCalledWith("unhandled");
    });
  });
});
