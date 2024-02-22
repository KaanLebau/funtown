import JobApplicationPresenter from "../../presenters/jobApplicationPresenter/JobApplicationPresenter";
import "./applicationFormPage.scss";
/**
 * ApplicationFormPage component.
 *
 * This component represents the page for submitting job applications.
 * It renders the JobApplicationPresenter component, which contains the form for job applications.
 *
 * ```jsx
 * import ApplicationFormPage from "./pages/applicationFormPage/ApplicationFormPage";
 * <ApplicationFormPage />
 * ```
 *
 *
 * @component
 * @returns {JSX.Element} The rendered application form page.
 * @author Kaan
 */
function ApplicationFormPage() {
  return (
    <div
      data-testid="application-form-page"
      className="application-form-page-content"
    >
      <div className="application-form-presenter-wraper">
        <JobApplicationPresenter data-testid="application-presenter-componenet" />
      </div>
    </div>
  );
}

export default ApplicationFormPage;
