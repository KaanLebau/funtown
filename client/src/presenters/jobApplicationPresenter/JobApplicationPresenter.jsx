import "./jobApplicationPresenter.scss";
import { useState } from "react";
import ExperiencePresenter from "../experiencePresenter/ExperiencePresenter";
import { useRecoilValue, useRecoilState } from "recoil";
import {
  experienceSelectorState,
  currentUserState,
} from "../../model/userModel";
import AvailabilityPresenter from "../availabilityPresenter/AvailabilityPresenter";
import { languageSelector } from "../../model/languageModel";
import { useNavigate } from "react-router-dom";
import apiModule from "../../integration/funtownApi";

/**
 *
 * @param {*} props
 * @returns  {JSX.Element}
 */
function JobApplicationPresenter(props) {
  const navigate = useNavigate();
  const language = useRecoilValue(languageSelector);
  const experience = useRecoilValue(experienceSelectorState);
  const [user, setUser] = useRecoilState(currentUserState);
  const [availList, setAvailList] = useState([]);
  const [experienceList, setExperienceList] = useState(experience);
  const [req, setReq] = useState([]);
  const [loading, setLoading] = useState(false);

  function handleCancel() {
    navigate("/user/dashboard", { replace: true });
  }
  async function handleApply() {
    setLoading(true);
    try {
      await apiModule.updateUserAvailability(user.token, req);
      navigate("/notification", {
        replace: true,
        state: { redirect: "/user/dashboard", code: 211 },
      });
    } catch (error) {
      console.log(error.message);
      navigate("/notification", {
        replace: true,
        state: { redirect: "/user/application", code: 503 },
      });
    } finally {
      setLoading(false);
    }
  }
  function handleUpdate(list) {
    setReq(list);
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
          updateList={handleUpdate}
          loading={loading}
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
