import React from "react";
import HeadPresenter from "../../presenters/headPresenter/HeadPresenter";
import JobApplicationPresenter from "../../presenters/jobApplicationPresenter/JobApplicationPresenter";
import TabelPresenter from "../../presenters/tablePresenter/TablePresenter";

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
