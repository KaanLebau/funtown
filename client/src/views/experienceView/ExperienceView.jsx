import React from "react";
import { useRef } from "react";
import {
  IoIosRemoveCircle,
  IoIosAlert,
  IoMdRefreshCircle,
  IoMdCreate,
} from "react-icons/io";
import "./experienceView.scss";
/**
 * View component for displaying and managing user experience data.
 *
 * @component
 * @example
 * // Usage in another component
 * import ExperienceView from './path/to/ExperienceView';
 * // ...
 * const positions = ["Position 1", "Position 2", "Position 3"];
 * const experienceOption = ["Experience 1", "Experience 2", "Experience 3"];
 * const experience = [
 *   { selectedPosition: "Position 1", selectedExperience: "Experience 1" },
 *   { selectedPosition: "Position 2", selectedExperience: "Experience 2" },
 * ];
 * const editStates = [false, true, false];
 *
 * <ExperienceView
 *   experience={experience}
 *   positions={positions}
 *   experienceOption={experienceOption}
 *   editStates={editStates}
 *   addExperience={(exp) => console.log("Add experience:", exp)}
 *   editExperience={(index) => console.log("Edit experience:", index)}
 *   updateExperience={(data) => console.log("Update experience:", data)}
 *   removeExperience={(index) => console.log("Remove experience:", index)}
 * />
 *
 * @param {Object} props - Component properties
 * @param {Array} props.experience - An array of objects representing user experience
 * @param {Array} props.positions - An array of strings representing available positions
 * @param {Array} props.experienceOption - An array of strings representing available experience options
 * @param {Array} props.editStates - An array of booleans representing edit states for each experience item
 * @param {Function} props.addExperience - Function to add new experience
 * @param {Function} props.editExperience - Function to toggle edit state for a specific experience item
 * @param {Function} props.updateExperience - Function to update an experience item
 * @param {Function} props.removeExperience - Function to remove an experience item
 * @returns {JSX.Element} The rendered ExperienceView component
 */
function ExperienceView(props) {
  const positionRef = useRef(null);
  const experienceRef = useRef(null);
  const experienceUpdateRef = useRef(null);

  return (
    <div data-testid="exp-view" className="competence-view">
      <p className="exp-view-title">Your competence</p>
      <div className="list">
        {props.experience.length === 0 ? (
          <p data-testid="no-experience" className="no-experience">
            Add your experiences
          </p>
        ) : (
          props.experience.map((exp, index) => (
            <div key={index} className="experience">
              <div className="icons-left">
                {props.editStates[index] && (
                  <IoIosAlert data-testid="alert-icon" className="not-saved" />
                )}
              </div>

              <div className="the-experience">
                <p className="the-experience-position">
                  {exp.selectedPosition}
                </p>

                {!props.editStates[index] ? (
                  <p className="the-experience-experience">
                    {exp.selectedExperience}
                  </p>
                ) : (
                  <select
                    ref={experienceUpdateRef}
                    title="Experience"
                    data-testid="experience-alternatives"
                    defaultValue={exp.selectedExperience}
                  >
                    {props.experienceOption.map((item, index) => (
                      <option key={index} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                )}
              </div>

              <div className="icons-right">
                {!props.editStates[index] ? (
                  <IoMdCreate
                    className="icon"
                    data-testid="edit-experience-icon"
                    title="Edit experience"
                    onClick={() => props.editExperience(index)}
                  />
                ) : (
                  <>
                    <IoIosRemoveCircle
                      className="icon"
                      data-testid="remove-experience-icon"
                      title="Remove experience"
                      onClick={() => props.removeExperience(index)}
                    />
                    <IoMdRefreshCircle
                      className="icon"
                      data-testid="update-experience-icon"
                      title="Update experience"
                      onClick={() =>
                        props.updateExperience({
                          index: index,
                          updated: {
                            selectedPosition: exp.selectedPosition,
                            selectedExperience: experienceUpdateRef.current
                              ? experienceUpdateRef.current.value
                              : exp.selectedExperience,
                          },
                        })
                      }
                    />
                  </>
                )}
              </div>
            </div>
          ))
        )}
      </div>
      {props.experience.length === props.positions.length ? (
        <p className="full-experience">
          All availabel positions <br />
          are filled with experience
        </p>
      ) : (
        <div className="controller">
          <select
            ref={positionRef}
            title="Positions"
            data-testid="position-alternatives"
          >
            <option value="" disabled selected>
              Position
            </option>{" "}
            {/* Default option */}
            {props.positions.map((item, index) => {
              if (
                !props.experience.some((exp) => exp.selectedPosition === item)
              ) {
                return (
                  <option key={index} value={item}>
                    {item}
                  </option>
                );
              }
              return null;
            })}
          </select>

          <select
            ref={experienceRef}
            title="Experience"
            data-testid="experience-alternatives"
          >
            <option value="" disabled selected>
              Experience
            </option>{" "}
            {props.experienceOption.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
          <button
            data-testid="add-experience-button"
            className="add-button"
            title="Add experience"
            disabled={!positionRef || !experienceRef}
            onClick={() =>
              props.addExperience({
                position: positionRef.current.value,
                experience: experienceRef.current.value,
              })
            }
          >
            add
          </button>
        </div>
      )}
    </div>
  );
}

export default ExperienceView;
