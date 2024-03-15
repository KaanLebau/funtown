import CompetenceInfoView from "../../views/competenceInfoView/CompetenceInfoView";
import ScheduleView from "../../views/scheduleView/ScheduleView";
import UserInfoView from "../../views/userInfoView/UserInfoView";
import ExperiencePresenter from "../experiencePresenter/ExperiencePresenter";
import JobTabelPresenter from "../jobTabelPresenter/JobTablePresenter";
import "./userDashboardPresenter.scss";
import { useState } from "react";
import { currentUserState } from "../../model/userModel";
import { useRecoilState } from "recoil";

/**
 * User Dashboard Presenter component.
 *
 * This component serves as the presenter for the user dashboard, displaying user information, competence information,
 * schedule, and job table. It allows users to view their profile information, manage their competences, and view their
 * schedules and job applications.
 *
 * @component
 * @param {Object} props - The props of the component.
 * @param {Object} props.user - The user object containing user information.
 * @returns {JSX.Element} The rendered User Dashboard Presenter.
 * @author Kaan
 *
 * @example
 * // Import UserDashboardPresenter component
 * import UserDashboardPresenter from "/path-to-presenter";
 *
 * // Inside a React functional component
 * return (
 *   <UserDashboardPresenter user={userData} />
 * )
 */
function UserDashboardPresenter(props) {
  const [updateExperience, setUpdateExperience] = useState(false);
  const [selectedCompetence, setSelectedCompetence] = useState(0);
  const [theUser] = useRecoilState(currentUserState);
  function showExperience(index) {
    setSelectedCompetence(index);
  }
  function handleUpdateExperience() {
    setUpdateExperience(false);
  }

  return (
    <div
      data-testid="user-dashboard-presenter"
      className="user-dashboard-presenter"
    >
      <div className="left">
        <UserInfoView user={props.user} />

        {updateExperience ? (
          <>
            <ExperiencePresenter
              experience={props.user.experience}
              dashboard={true}
              updateExperience={handleUpdateExperience}
              role={theUser.role}
            />
          </>
        ) : (
          <>
            <CompetenceInfoView
              experience={props.user.experience}
              selectedCompetence={selectedCompetence}
              setSelectedCompetence={showExperience}
              newCompetence={() => setUpdateExperience(true)}
              updateExperience={updateExperience}
            />
          </>
        )}
      </div>
      <div className="right">
        <div className="right-top">
          <ScheduleView
            data-testid="schedule-component"
            role={props.user.role}
            availability={props.user.availability}
          />
        </div>
        <div className="right-bottom">
          <JobTabelPresenter
            data-testid="job-tabel-component"
            role={props.user.role}
            data={props.user.availability}
          />
        </div>
      </div>
    </div>
  );
}

export default UserDashboardPresenter;
