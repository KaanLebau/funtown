import { currentUserState } from "../../model/userModel";
import { useRecoilValue } from "recoil";
import "./dashboardPage.scss";
import UserDashboardPresenter from "../../presenters/userDashboardPresenter/UserDashboardPresenter";
import RecruiterDashboardPresenter from "../../presenters/recruiterDashboardPresenter/RecruiterDashboardPresenter";
import { useNavigate } from "react-router-dom";

/**
 * Dashboard page component.
 *
 * This component displays different dashboard views based on the user's role.
 * If the user is an APPLICANT, it renders the UserDashboardPresenter component.
 * If the user is a RECRUITER, it renders the RecruiterDashboardPresenter component.
 * If the user's role is not specified or unknown, it redirects to the notification page.
 *
 * Example usage:
 *
 * ```jsx
 * import DashboardPage from "/path-to-presenter";
 * <DashboardPage />
 * ```
 *
 * @component
 * @returns {JSX.Element} The rendered dashboard page.
 * @author Kaan
 */
function DashboardPage() {
  const user = useRecoilValue(currentUserState);
  const navigate = useNavigate();
  /**
   * Selects the appropriate dashboard component based on the user's role.
   *
   * @param {string} role - The role of the user.
   * @returns {JSX.Element} The dashboard presenter component.
   * @author Kaan
   */
  function dashboardSelector(role) {
    switch (role) {
      case "APPLICANT":
        return (
          <div data-testid="user-dashboard-presenter-wraper">
            <UserDashboardPresenter className="current-dashboard" user={user} />
          </div>
        );
      case "RECRUITER":
        return (
          <div data-testid="recruiter-dashboard-presenter-wraper">
            <RecruiterDashboardPresenter
              className="current-dashboard"
              user={user}
            />
          </div>
        );

      default:
        navigate("/notification", {
          replace: true,
          state: { redirect: "/", code: 401 },
        });
        break;
    }
  }

  return (
    <div data-testid="dashboard-page" className="dashboard-page-content">
      <div data-testid="dashboard-component-wraper" className="apply">
        {dashboardSelector(user.role)}
      </div>
    </div>
  );
}

export default DashboardPage;
