import CompetenceInfoView from "../../views/competenceInfoView/CompetenceInfoView";
import ScheduleView from "../../views/scheduleView/ScheduleView";
import UserInfoView from "../../views/userInfoView/UserInfoView";
import ExperiencePresenter from "../experiencePresenter/ExperiencePresenter";
import JobTabelPresenter from "../jobTabelPresenter/JobTablePresenter";
import "./userDashboardPresenter.scss";
import { useState } from "react";

function UserDashboardPresenter(props) {
  const [updateExperience, setUpdateExperience] = useState(false);
  const [selectedCompetence, setSelectedCompetence] = useState(0);
  function showExperience(index) {
    setSelectedCompetence(index);
  }

  return (
    <div
      data-testid="user-dashboard-presenter"
      className="user-dashboard-presenter"
    >
      <div className="left">
        <UserInfoView data-testid="user-info-componenet" user={props.user} />
        {updateExperience ? (
          <ExperiencePresenter
            data-testid="experience-component"
            experience={props.user.experience}
            dashboard={true}
            updateExperience={() => setUpdateExperience(false)}
          />
        ) : (
          <CompetenceInfoView
            data-testid="competence-info-component"
            experience={props.user.experience}
            selectedCompetence={selectedCompetence}
            setSelectedCompetence={showExperience}
            newCompetence={() => setUpdateExperience(true)}
            updateExperience={updateExperience}
          />
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
            user={props.user}
          />
        </div>
      </div>
    </div>
  );
}

export default UserDashboardPresenter;
