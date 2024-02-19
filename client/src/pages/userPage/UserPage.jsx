import React from "react";
import JobApplicationPresenter from "../../presenters/jobApplicationPresenter/JobApplicationPresenter";

function UserPage() {
  return (
    <div data-testid="user-page" className="content">
      <div className="apply">
        <JobApplicationPresenter />
      </div>
    </div>
  );
}

export default UserPage;
