import React from "react";
import RecruiterWorkPlanePresenter from "../presenters/recruiterWorkPlanePresenter/RecruiterWorkPlanePresenter";

function Rendertestin() {
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
  return (
    <div>
      <RecruiterWorkPlanePresenter applicants={mockApplicants} />
    </div>
  );
}

export default Rendertestin;
