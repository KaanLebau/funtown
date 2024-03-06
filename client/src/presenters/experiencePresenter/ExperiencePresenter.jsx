import ExperienceView from "../../views/experienceView/ExperienceView";
import { useRecoilValue } from "recoil";
import { experienceOptions, positionOptions } from "../../model/businessModel";
import { experienceSelectorState } from "../../model/userModel";
import { useRecoilState } from "recoil";
import { useEffect, useState } from "react";

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

  const [experience, setExperience] = useState([]);
  const [experienceSelector, setExperienceSelector] = useRecoilState(
    experienceSelectorState
  );
  const [editStates, setEditStates] = useState(
    Array(experienceSelector.length).fill(false)
  );

  const [newData, setNewData] = useState(false);
  function apiCall() {
    console.log("implement api call ");
    setExperienceSelector(experience);
  }

  function handleAdd(exp) {
    setExperience([
      ...experience,
      { position: exp.position, experience: exp.experience },
    ]);

    setEditStates([...editStates, false]);
    setNewData(!newData);
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
    let removedList = experience.filter((_, index) => index !== indexToRemove);
    setExperience(removedList);
    setExperienceSelector(experience);
    setNewData(!newData);
  }
  useEffect(() => {
    if (!newData) {
      setExperience(experienceSelector);
    }
  }, [experience, newData]);

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
