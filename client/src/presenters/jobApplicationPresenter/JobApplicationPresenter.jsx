import JobApplicationView from "../../views/jobApplicationView/JobApplicationView";
import "./jobApplicationPresenter.scss";
import { currentPositions } from "../../model/businessModel";
import { useRecoilValue, useRecoilState } from "recoil";
import ExperienceView from "../../views/experienceView/ExperienceView";
import { experienceSelectorState } from "../../model/userModel";
import { useState } from "react";
import AvailabilityView from "../../views/availabilityView/AvailabilityView";
/**
 *
 * @param {*} props
 * @returns  {JSX.Element}
 */
function JobApplicationPresenter(props) {
  const positions = useRecoilValue(currentPositions);
  const [userExperience, setUserExperience] = useRecoilState(
    experienceSelectorState
  );
  const [availList, setAvailList] = useState([]);

  function handleCancel() {
    console.log("cancel");
  }
  function handleApply() {
    console.log("apply");
  }
  function handleNewExp(exp) {
    let newExpList = userExperience;
    newExpList = [...newExpList, exp];
    setUserExperience(newExpList);
  }

  return (
    <div
      data-testid="job-application-presenter"
      className="application-presenter"
    >
      <JobApplicationView
        position={positions}
        experience={[
          0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.1, 1.2, 1.3, 1.4, 1.5,
          1.6, 1.7, 1.8, 1.9, 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 2.8, 2.9, 3.1,
          3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.8, 3.9,
        ]}
        cancel={handleCancel}
        apply={handleApply}
      />
      <ExperienceView
        experience={userExperience}
        position={positions}
        experienceSize={[
          0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.1, 1.2, 1.3, 1.4, 1.5,
          1.6, 1.7, 1.8, 1.9, 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 2.8, 2.9, 3.1,
          3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.8, 3.9,
        ]}
        addExp={handleNewExp}
      />
      <AvailabilityView availList={availList} setAvailList={setAvailList} />

      <button onClick={handleApply}>Apply</button>
      <button onClick={handleCancel}>Cancel</button>
    </div>
  );
}

export default JobApplicationPresenter;
