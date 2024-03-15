  import ExperienceView from "../../views/experienceView/ExperienceView";
import { useRecoilValue } from "recoil";
import { experienceOptions, positionOptions } from "../../model/businessModel";
import {
  experienceSelectorState,
  jwtTokenSelector,
} from "../../model/userModel";
import { useRecoilState } from "recoil";
import { useEffect, useState } from "react";
import apiModule from "../../integration/funtownApi";
import { currentUserState } from "../../model/userModel";

/**
 * Presenter component for managing user experience data and rendering the ExperienceView.
 *
 * @component
 * @example
 * // Usage in another component
 * import ExperiencePresenter from './path/to/ExperiencePresenter';
 * // ...
 * <ExperiencePresenter />
 *
 * @returns {JSX.Element} The rendered ExperiencePresenter component
 */
function ExperiencePresenter(props) {
  const experienceOption = useRecoilValue(experienceOptions);
  const positions = useRecoilValue(positionOptions);
  const token = useRecoilValue(jwtTokenSelector);
  const theUser = useRecoilState(currentUserState);
  const [experience, setExperience] = useState([]);
  const [experienceSelector, setExperienceSelector] = useRecoilState(
    experienceSelectorState
  );
  const [editStates, setEditStates] = useState(
    Array(experienceSelector.length).fill(false)
  );
  function positionId(opt) {
    let foundId = null;
    positions.map((position) => {
      if (position.position === opt) {
        foundId = position.id;
      }
    });
    return foundId;
  }
  function requestBuilder() {
    let req = [];
    experience.map((exp) => {
      req.push({
        personId: theUser[0].id,
        positionId: positionId(exp.position),
        experience: exp.experience,
      });
    });
    return req;
  }

  async function apiCall() {
    let req = requestBuilder();
    console.log(req);
    apiModule.updateUserExperience(token, experienceSelector);
  }

  function handleAdd(exp) {
    const updatedExperience = [
      ...experience,
      { position: exp.position, experience: exp.experience },
    ];

    setExperience(updatedExperience);
    setExperienceSelector(updatedExperience);
    setEditStates([...editStates, false]);

    //apiCall();
  }
  function selectExperience(index) {
    setEditStates((prevStates) =>
      prevStates.map((state, i) => (i === index ? !state : state))
    );
  }

  function handleUpdate(data) {
    selectExperience(data.index);
    const updatedExperienceList = experience.map((exp, index) =>
      index === data.index ? data.updated : exp
    );

    setExperience(updatedExperienceList);

    setExperienceSelector(updatedExperienceList);

    //apiCall();
  }
  function handleRemove(indexToRemove) {
    let removedList = experience.filter((_, index) => index !== indexToRemove);
    setExperience(removedList);
    setExperienceSelector(removedList);

    //apiCall();
  }
  useEffect(() => {
    setExperience(experienceSelector);
  }, []);

  useEffect(() => {
    setExperienceSelector(experience);
  }, [experience]);

  return (
    <ExperienceView
      experience={experience}
      positionOptions={positions}
      experienceOption={experienceOption}
      addExperience={handleAdd}
      editStates={editStates}
      editExperience={selectExperience}
      updateExperience={handleUpdate}
      removeExperience={handleRemove}
      dashboard={props.dashboard}
      dashboardUpdate={() => props.updateExperience()}
      role={props.role}
    />
  );
}

export default ExperiencePresenter;
