import "./competenceInfoView.scss";
import { languageSelector } from "../../model/languageModel";
import { useRecoilValue } from "recoil";

function CompetenceInfoView(props) {
  const language = useRecoilValue(languageSelector);

  return (
    <div data-testid="competence-info-view" className="competence-info-view">
      <p className="competence-view-title">{language.competenceTitle}</p>
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
