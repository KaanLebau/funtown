import JobApplicationPresenter from "../../presenters/jobApplicationPresenter/JobApplicationPresenter";
import "./applicationFormPage.scss";
function ApplicationFormPage() {
  return (
    <div data-testid="user-page" className="application-form-page-content">
      <div className="apply">
        <JobApplicationPresenter />
      </div>
    </div>
  );
}

export default ApplicationFormPage;
