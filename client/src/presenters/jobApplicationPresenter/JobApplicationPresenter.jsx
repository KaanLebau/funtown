import "./jobApplicationPresenter.scss";
import { useState } from "react";
import ExperiencePresenter from "../experiencePresenter/ExperiencePresenter";
import { useRecoilValue, RecoilState } from "recoil";
import {
  experienceSelectorState,
  currentUserState,
} from "../../model/userModel";
import AvailabilityPresenter from "../availabilityPresenter/AvailabilityPresenter";
import { languageSelector } from "../../model/languageModel";
import { useNavigate } from "react-router-dom";

/**
 *
 * @param {*} props
 * @returns  {JSX.Element}
 */
function JobApplicationPresenter(props) {
  const navigate = useNavigate();
  const language = useRecoilValue(languageSelector);
  const experience = useRecoilValue(experienceSelectorState);
  const user = useRecoilValue(currentUserState);
  const [availList, setAvailList] = useState([]);
  const [experienceList, setExperienceList] = useState(experience);

  function handleCancel() {
    console.log("cancel");
    navigate("/user/dashboard", { replace: true });
  }
  function handleApply() {
    console.log("apply");

    navigate("/notification", {
      replace: true,
      state: { redirect: "/user/dashboard", code: 211 },
    });
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
          experience={user.experience}
          updateList={setExperienceList}
          dashboard={false}
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
