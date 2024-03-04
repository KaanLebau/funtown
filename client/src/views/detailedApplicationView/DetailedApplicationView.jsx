import "./detailedApplicationView.scss";
import {
  FaUserGear,
  FaUserTag,
  FaUserTie,
  FaRegCircleXmark,
  FaCirclePause,
} from "react-icons/fa6";
import {
  FaCheckCircle,
  FaEdit,
  FaRegSave,
  FaRegTimesCircle,
} from "react-icons/fa";
import { GrDocumentMissing } from "react-icons/gr";
import { languageSelector } from "../../model/languageModel";
import { useRecoilValue } from "recoil";
import { positionOptions } from "../../model/businessModel";
import { statusOptions } from "../../model/businessModel";
import { useRef } from "react";
function selectPositionIcon(position) {
  if (position === "roller coaster operation") {
    return (
      <FaUserGear
        data-testid="roller-coaster-icon"
        title="Roller coster"
        className="position-icon"
      />
    );
  } else if (position === "lotteries") {
    return (
      <FaUserTag
        data-testid="lotteries-icon"
        title="Lotteries"
        className="position-icon"
      />
    );
  } else if (position === "ticket sales") {
    return (
      <FaUserTie
        data-testid="ticket-sales-icon"
        title="Ticket sales"
        className="position-icon"
      />
    );
  }
}
function selectStatusIcon(status) {
  if (status === "accepted") {
    return (
      <FaCheckCircle
        data-testid="accepted-icon"
        title="Accepted"
        className="status-icon"
      />
    );
  } else if (status === "rejected") {
    return (
      <FaRegCircleXmark
        data-testid="rejected-icon"
        title="Rejected"
        className="status-icon"
      />
    );
  } else if (status === "unhandled") {
    return (
      <FaCirclePause
        data-testid="unhandled-icon"
        title="Pending"
        className="status-icon"
      />
    );
  }
}
/**
 * View component for displaying detailed applicant information.
 *
 * @component
 * @example
 * // Usage in another component
 * import DetailedApplicationView from './path/to/DetailedApplicationView';
 * // ...
 * const applicationData = {
 *   position: "roller coaster operation",
 *   fullName: "John Doe",
 *   experience: "2 years",
 *   fromDate: "2023-01-01",
 *   toDate: "2023-12-31",
 *   status: "accepted"
 * };
 * const editing = true;
 * const statusOptions = ["accepted", "rejected", "unhandled"];
 *
 * <DetailedApplicationView
 *   application={applicationData}
 *   editing={editing}
 *   status={statusOptions}
 *   edit={() => console.log("Edit button clicked")}
 *   save={() => console.log("Save button clicked")}
 *   cancel={() => console.log("Cancel button clicked")}
 *   updateStatus={(status) => console.log("Status updated to:", status)}
 * />
 *
 * @param {Object} props - Component properties
 * @param {Object} props.application - An object representing applicant information
 * @param {string} props.application.position - The position applied for
 * @param {string} props.application.fullName - The full name of the applicant
 * @param {string} props.application.experience - The experience of the applicant
 * @param {string} props.application.fromDate - The start date of the applicant's period
 * @param {string} props.application.toDate - The end date of the applicant's period
 * @param {string} props.application.status - The status of the application
 * @param {boolean} props.editing - A boolean indicating whether the application is being edited
 * @param {Array} props.status - An array of strings representing status options
 * @param {Function} props.edit - Function to handle edit action
 * @param {Function} props.save - Function to handle save action
 * @param {Function} props.cancel - Function to handle cancel action
 * @param {Function} props.updateStatus - Function to handle status update
 * @returns {JSX.Element} The rendered DetailedApplicationView component
 */
function DetailedApplicationView(props) {
  const language = useRecoilValue(languageSelector);
  const positionList = useRecoilValue(positionOptions);
  const statusList = useRecoilValue(statusOptions);
  const positionRef = useRef(null);
  const statusRef = useRef(null);

  return (
    <div
      data-testid="detailed-application-view"
      className="detailed-application-view"
    >
      <div className="detailed-application-view-top">
        <div
          data-testid="detailed-application-view-title"
          className="detailed-application-view-title"
        >
          <p>{language.detailedAplicantTitle}</p>
        </div>
      </div>
      <div className="detailed-application-view-middle">
        <div
          data-testid="detailed-application-view-content"
          className="detailed-application-view-content"
        >
          {props.application ? (
            <div
              data-testid="applicant-with-data"
              className="applicant-with-data"
            >
              <div
                data-testid="applicant-with-data-right"
                className="applicant-with-data-right"
              >
                {props.editing ? (
                  <div className="updating-application-status">
                    <p className="updating-application-label">
                      {language.competencePosition}
                    </p>
                    <select
                      ref={positionRef}
                      title={language.competencePosition}
                      data-testid="position-alternatives"
                    >
                      <option value="" disabled defaultValue>
                        {language.competencePosition}
                      </option>{" "}
                      {/* Default option */}
                      {positionList.map((item, index) => (
                        <option key={index} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                    <p className="updating-application-label">
                      {language.status}
                    </p>
                    <select
                      ref={statusRef}
                      title={language.competencePosition}
                      data-testid="position-alternatives"
                    >
                      <option value="" disabled defaultValue>
                        {language.competencePosition}
                      </option>{" "}
                      {/* Default option */}
                      {statusList.map((item, index) => (
                        <option key={index} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </div>
                ) : (
                  <div className="current-application-status">
                    {props.application.status === "accepted" ? (
                      <div
                        data-testid="applicant-status"
                        className="applicant-status"
                      >
                        <div
                          data-testid="aplicant-status-icon-container"
                          className="aplicant-status-icon-container"
                        >
                          {selectPositionIcon(props.application.position)}
                          {selectStatusIcon(props.application.status)}
                        </div>
                        <div
                          data-testid="applicant-status-info-container"
                          className="applicant-status-info-container"
                        >
                          <p className="label"> {language.acceptedPosition}:</p>
                          <p className="position">
                            {props.application.position}
                          </p>
                          <p className="label">{language.contactPerson}:</p>
                          <p className="contact">{props.application.contact}</p>
                        </div>
                      </div>
                    ) : props.application.status === "rejected" ? (
                      <div
                        data-testid="applicant-status"
                        className="applicant-status"
                      >
                        <div
                          data-testid="aplicant-status-icon-container"
                          className="aplicant-status-icon-container"
                        >
                          {selectStatusIcon(props.application.status)}
                        </div>
                        <div
                          data-testid="applicant-status-info-container"
                          className="applicant-status-info-container"
                        >
                          <p
                            data-testid="status-position-label"
                            className="label"
                          >
                            {" "}
                            {language.status}:
                          </p>
                          <p data-testid="status-position" className="position">
                            {props.application.status}
                          </p>
                          <p
                            data-testid="status-contact-label"
                            className="label"
                          >
                            {language.contactPerson}:
                          </p>
                          <p data-testid="status-contact" className="contact">
                            {props.application.contact}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="applicant-status">
                        <div className="aplicant-status-icon-container">
                          {selectStatusIcon(props.application.status)}
                        </div>
                        <div className="applicant-status-info-container">
                          <p className="label"> {language.status}:</p>
                          <p className="position">{props.application.status}</p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div
                data-testid="applicant-with-data-middle"
                className="applicant-with-data-middle"
              >
                <div data-testid="person-info" className="person-info">
                  <p data-testid="person-info-name-label" className="label">
                    {language.name}:
                  </p>
                  <p data-testid="person-info-name" className="name">
                    {props.application.fullName}
                  </p>
                  <hr />

                  <p
                    data-testid="person-info-date-from-label"
                    className="label"
                  >
                    {language.from}:
                  </p>
                  <p data-testid="person-info-date-from" className="date">
                    {props.application.fromDate}
                  </p>
                  <p data-testid="person-info-date-to-label" className="label">
                    {language.to}:
                  </p>
                  <p data-testid="person-info-date-to" className="date">
                    {props.application.toDate}
                  </p>
                </div>
              </div>
              <div className="applicant-with-data-left">
                <p className="applicant-experience-title">
                  {language.applicantExperience}
                </p>
                {props.application.experience.length === 0 ? (
                  <>
                    <GrDocumentMissing className="no-data-icon" />
                    <p className="no-data-msg">{language.noExperinece}</p>
                  </>
                ) : (
                  props.application.experience.map((exp, index) => (
                    <div
                      key={index}
                      data-testid="experience"
                      className="applicant-experience"
                    >
                      <p
                        data-testid="applicant-experience-position"
                        className="experience-position"
                      >
                        {exp.position}
                      </p>
                      <p
                        data-testid="applicant-experience-duration"
                        className="experience-duration"
                      >
                        {exp.experience}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          ) : (
            <div className="aplicant-with-no-data">
              <GrDocumentMissing className="no-data-icon" />
              <p className="no-data-msg">{language.noData}</p>
            </div>
          )}
        </div>
      </div>
      <div className="detailed-application-view-bottom">
        {props.editing ? (
          <div
            data-testid="detailed-application-view-bottom-controller"
            className="detailed-application-view-bottom-controller"
          >
            <button
              data-testid="detailed-application-view-bottom-button-edit"
              onClick={props.edit}
            >
              {language.applicantUpdate}
            </button>
            <button
              data-testid="detailed-application-view-bottom-button-edit"
              onClick={props.edit}
            >
              {language.cancel}
            </button>
          </div>
        ) : (
          <div className="detailed-application-view-bottom-controller">
            <button
              data-testid="detailed-application-view-bottom-button-edit"
              onClick={props.edit}
            >
              {language.applicantHandle}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default DetailedApplicationView;
