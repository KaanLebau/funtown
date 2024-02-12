import JobApplicationView from "../../views/jobApplicationView/JobApplicationView";
import "./jobApplicationPresenter.scss";
import { useEffect, useState } from "react";
import AvailabilityView from "../../views/availabilityView/AvailabilityView";
import ExperiencePresenter from "../experiencePresenter/ExperiencePresenter";
import { useRecoilValue } from "recoil";
import { experienceSelectorState } from "../../model/businessModel";
/**
 *
 * @param {*} props
 * @returns  {JSX.Element}
 */
function JobApplicationPresenter(props) {
  const experience = useRecoilValue(experienceSelectorState);
  const [availList, setAvailList] = useState([]);
  const [experienceList, setExperienceList] = useState(experience);

  function handleCancel() {
    console.log("cancel");
  }
  function handleApply() {
    console.log("apply");
  }

  return (
    <div
      data-testid="job-application-presenter"
      className="application-presenter"
    >
      <div data-testid="conteiner-title" className="conteiner-title">
        Apply for a job
      </div>
      <ExperiencePresenter
        experience={experienceList}
        updateList={setExperienceList}
      />
      <AvailabilityView availList={availList} setAvailList={setAvailList} />

      <button onClick={handleApply}>Apply</button>
      <button onClick={handleCancel}>Cancel</button>
    </div>
  );
}

export default JobApplicationPresenter;
