import { currentUserState } from "../../model/userModel";
import { useRecoilValue } from "recoil";
import "./dashboardPage.scss";
import UserDashboardPresenter from "../../presenters/userDashboardPresenter/UserDashboardPresenter";
import RecruiterDashboardPresenter from "../../presenters/recruiterDashboardPresenter/RecruiterDashboardPresenter";

function DashboardPage() {
  const user = useRecoilValue(currentUserState);
  function dashboardSelector(role) {
    switch (role) {
      case "APPLICANT":
        return (
          <UserDashboardPresenter className="current-dashboard" user={user} />
        );
      case "RECRUITER":
        return (
          <RecruiterDashboardPresenter
            className="current-dashboard"
            user={user}
          />
        );

      default:
        break;
    }
  }
  return (
    <div data-testid="dashboard-page" className="dashboard-page-content">
      <div className="apply">{dashboardSelector(user.role)}</div>
    </div>
  );
}

export default DashboardPage;
