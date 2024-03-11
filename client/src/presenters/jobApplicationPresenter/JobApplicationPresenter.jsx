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
 * Job Application Presenter component.
 *
 * This component manages the presentation logic for the job application process. It handles the display and management
 * of user experience and availability information, as well as the application submission process. It renders the
 * ExperiencePresenter and AvailabilityPresenter components to manage experience and availability data respectively,
 * and provides buttons for submitting or canceling the application.
 *
 * @component
 * @returns {JSX.Element} The rendered Job Application Presenter.
 * @author Kaan
 *
 * @example
 * // Import JobApplicationPresenter component
 * import JobApplicationPresenter from "/path-to-presenter";
 *
 * // Inside a React functional component
 * return (
 *   <JobApplicationPresenter />
 * )
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
  function stringConverter(list) {
    let stringDate = [];
    list.map((avail) => {
      stringDate.push({
        username: avail.username,
        from: avail.fromDate.toString(),
        to: avail.toDate.toString(),
        status: avail.status,
        position: avail.position,
        contact: avail.contact,
      });
    });
    return stringDate;
  }

  async function handleApply() {
    setLoading(true);
    try {
      const availlist = await apiModule.addUserAvailability(user.token, req);
      console.log("create works");
      const alist = await apiModule.getUserAvailability(
        user.token,
        user.username
      );
      console.log("get all  works");
      console.log(alist);
      setUser({ ...user, availability: alist });
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
