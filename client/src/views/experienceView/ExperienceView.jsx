import "./experienceView.scss";
import React, { useRef } from "react";
function ExperienceView(props) {
  const positionRef = useRef(null);
  const experienceRef = useRef(null);
  let updateExp = false;

  return (
    <div data-testId="experience-view" className="experience-view">
      <p className="experience-text">Select your experience</p>
      {props.experience.map((item, index) => (
        <div key={index} className="experience">
          {Object.keys(item).length !== 0 ? (
            <div className="pos" onClick={() => console.log("hu")}>
              <p id="position">{item.position} :</p>
              <p id="experience" className="experience">
                {item.experience}
              </p>
              {updateExp && <p className="update-button">Update</p>}
            </div>
          ) : (
            <div></div>
          )}
        </div>
      ))}
      {props.experience.length !== props.position.length ? (
        <div className="newExp">
          <select ref={positionRef} title="Positions">
            <option value="Position">Position </option>
            {props.position.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
          <select ref={experienceRef} title="Experiences">
            <option value="Experience">Experience </option>
            {props.experienceSize.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
          <button
            className="add-button"
            title="Add experience"
            disabled={!positionRef === null || !experienceRef === null}
            onClick={() =>
              props.addExp({
                position: positionRef.current.value,
                experience: experienceRef.current.value,
              })
            }
          >
            add
          </button>
        </div>
      ) : (
        <div className="noPosition">Update experience</div>
      )}
    </div>
  );
}

export default ExperienceView;
