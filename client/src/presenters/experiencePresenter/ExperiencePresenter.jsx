import ExperienceView from "../../views/experienceView/ExperienceView";
import { useRecoilValue } from "recoil";
import { experienceOptions, positionOptions } from "../../model/businessModel";
import { useState } from "react";

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
  const [experience, setExperience] = useState(props.experience);
  const [editStates, setEditStates] = useState(
    Array(experience.length).fill(false)
  );
  function apiCall() {
    console.log("implement api call ");
  }

  function handleAdd(exp) {
    setExperience([
      ...experience,
      { position: exp.position, experience: exp.experience },
    ]);
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
    apiCall();
  }
  function handleRemove(indexToRemove) {
    setExperience((prevExperience) =>
      prevExperience.filter((_, index) => index !== indexToRemove)
    );
    props.updateList(experience);
  }

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
