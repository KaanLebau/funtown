import JobApplicationView from "../../views/jobApplicationView/JobApplicationView";
import "./jobApplicationPresenter.scss";
import { useEffect, useState } from "react";
import AvailabilityView from "../../views/availabilityView/AvailabilityView";
import ExperiencePresenter from "../experiencePresenter/ExperiencePresenter";
import { useRecoilValue } from "recoil";
import { experienceSelectorState } from "../../model/userModel";
import AvailabilityPresenter from "../availabilityPresenter/AvailabilityPresenter";
import { languageSelector } from "../../model/languageModel";

/**
 *
 * @param {*} props
 * @returns  {JSX.Element}
 */
function JobApplicationPresenter(props) {
  const language = useRecoilValue(languageSelector);
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
        {language.applicationTitle}
      </div>
      <div className="lists">
        <ExperiencePresenter
          experience={experienceList}
          updateList={setExperienceList}
        />
        <AvailabilityPresenter
          availList={availList}
          setAvailList={setAvailList}
        />
      </div>
      <div className="buttons">
        <button title={language.apply} onClick={handleApply}>
          {language.apply}
        </button>
        <button title={language.cancel} onClick={handleCancel}>
          {language.cancel}
        </button>
      </div>
    </div>
  );
}

export default JobApplicationPresenter;
