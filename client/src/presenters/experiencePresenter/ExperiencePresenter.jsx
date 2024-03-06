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

  const [experience, setExperience] = useState([]);
  const [experienceSelector, setExperienceSelector] = useRecoilState(
    experienceSelectorState
  );
  const [editStates, setEditStates] = useState(
    Array(experienceSelector.length).fill(false)
  );

  async function apiCall() {
    setExperienceSelector(experience);
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

    apiCall();
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

    apiCall();
  }
  function handleRemove(indexToRemove) {
    let removedList = experience.filter((_, index) => index !== indexToRemove);
    setExperience(removedList);
    setExperienceSelector(removedList);

    apiCall();
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
      positions={positions}
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
