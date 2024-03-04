import React from "react";
import { useRef } from "react";
import {
  IoIosRemoveCircle,
  IoIosAlert,
  IoMdRefreshCircle,
  IoMdCreate,
} from "react-icons/io";
import "./experienceView.scss";
import { languageSelector } from "../../model/languageModel";
import { useRecoilValue } from "recoil";
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
 *   { position: "Position 1", experience: "Experience 1" },
 *   { position: "Position 2", experience: "Experience 2" },
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
  console.log(props.dashboard);
  const language = useRecoilValue(languageSelector);
  const positionRef = useRef(null);
  const experienceRef = useRef(null);
  const experienceUpdateRef = useRef(null);

  return (
    <div data-testid="exp-view" className="competence-view">
      <p className="exp-view-title">{language.applicationCompetenceTitle}</p>
      <div className="list">
        {props.experience.length === 0 ? (
          <p data-testid="no-experience" className="no-experience">
            {language.competenceEmpty}
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
                <p className="the-experience-position">{exp.position}</p>

                {!props.editStates[index] ? (
                  <p className="the-experience-experience">{exp.experience}</p>
                ) : (
                  <select
                    ref={experienceUpdateRef}
                    title={language.competenceExperience}
                    data-testid="experience-alternatives-inlist"
                    defaultValue={exp.experience}
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
                    title={language.editExperience}
                    onClick={() => props.editExperience(index)}
                  />
                ) : (
                  <>
                    <IoIosRemoveCircle
                      className="icon"
                      data-testid="remove-experience-icon"
                      title={language.removeExperience}
                      onClick={() => props.removeExperience(index)}
                    />
                    <IoMdRefreshCircle
                      className="icon"
                      data-testid="update-experience-icon"
                      title={language.updateExperience}
                      onClick={() =>
                        props.updateExperience({
                          index: index,
                          updated: {
                            position: exp.position,
                            experience: experienceUpdateRef.current
                              ? experienceUpdateRef.current.value
                              : exp.experience,
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
        <div className="dashboard-check">
          <p data-testid="full-experience-msg" className="full-experience">
            {language.competenceFull}
          </p>
        </div>
      ) : (
        <div className="controller">
          <select
            ref={positionRef}
            title={language.competencePosition}
            data-testid="position-alternatives"
          >
            <option value="" disabled defaultValue>
              {language.competencePosition}
            </option>{" "}
            {/* Default option */}
            {props.positions.map((item, index) => {
              if (!props.experience.some((exp) => exp.position === item)) {
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
            title={language.competenceExperience}
            data-testid="experience-alternatives"
          >
            <option value="" disabled defaultValue>
              {language.competenceExperience}
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
            title={language.addExperience}
            disabled={!positionRef || !experienceRef}
            onClick={() =>
              props.addExperience({
                position: positionRef.current.value,
                experience: experienceRef.current.value,
              })
            }
          >
            {language.add}
          </button>
          {props.dashboard && (
            <>
              <button
                onClick={() => props.dashboardUpdate()}
                title={language.update}
              >
                {language.update}
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default ExperienceView;
