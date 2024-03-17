import "./competenceInfoView.scss";
import { languageSelector } from "../../model/languageModel";
import { useRecoilValue } from "recoil";

/**
 * Competence Info View component.
 *
 * This component displays competence information, allowing users to view their competencies and select a specific competence to display its details.
 *
 * @component
 * @param {Object} props - The props of the component.
 * @param {Array} props.experience - The list of user's experiences/competencies.
 * @param {number} props.selectedCompetence - The index of the selected competence.
 * @param {Function} props.setSelectedCompetence - The function to set the selected competence.
 * @param {Function} props.newCompetence - The function to add a new competence.
 * @returns {JSX.Element} The rendered Competence Info View.
 * @author Kaan
 *
 * @example
 * // Import CompetenceInfoView component
 * import CompetenceInfoView from "./path/to/CompetenceInfoView";
 *
 * // Inside a React functional component
 * return (
 *   <CompetenceInfoView
 *     experience={userExperience}
 *     selectedCompetence={selectedExperienceIndex}
 *     setSelectedCompetence={handleSelectedExperience}
 *     newCompetence={handleAddNewExperience}
 *   />
 * )
 */
function CompetenceInfoView(props) {
  const language = useRecoilValue(languageSelector);

  return (
    <div data-testid="competence-info-view" className="competence-info-view">
      <p data-testid="competence-view-title" className="competence-view-title">
        {language.competenceTitle}
      </p>
      {props.experience.length === 0 ? (
        <div className="no-competence">
          <p data-testid="p-no-competence" className="p-no-competence">
            {language.competenceEmpty}
          </p>
          <button
            data-testid="button-no-competence"
            className="button-no-competence"
            onClick={props.newCompetence}
          >
            {language.addExperience}
          </button>
        </div>
      ) : (
        <div>
          <div className="selected-position-experience">
            <p>{props.experience[props.selectedCompetence].position}</p>
            <p>{props.experience[props.selectedCompetence].experience}</p>
          </div>
          <div className="control">
            {props.experience.map((item, index) => (
              <p
                data-testid={`position-option-${index}`}
                className={
                  index === props.selectedCompetence
                    ? "control-options-selected"
                    : "control-options"
                }
                key={index}
                onClick={() => props.setSelectedCompetence(index)}
              >
                {item.position}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default CompetenceInfoView;
