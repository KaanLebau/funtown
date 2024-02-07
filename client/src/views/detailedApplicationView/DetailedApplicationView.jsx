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
function selectPositionIcon(position) {
  if (position === "roller coaster operation") {
    return (
      <FaUserGear
        data-testid="roller-coaster-icon"
        title="Roller coster"
        className="user-icon"
      />
    );
  } else if (position === "lotteries") {
    return (
      <FaUserTag
        data-testid="lotteries-icon"
        title="Lotteries"
        className="user-icon"
      />
    );
  } else if (position === "ticket sales") {
    return (
      <FaUserTie
        data-testid="ticket-sales-icon"
        title="Ticket sales"
        className="user-icon"
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
        className="accepted"
      />
    );
  } else if (status === "rejected") {
    return (
      <FaRegCircleXmark
        data-testid="rejected-icon"
        title="Rejected"
        className="rejected"
      />
    );
  } else if (status === "unhandled") {
    return (
      <FaCirclePause
        data-testid="unhandled-icon"
        title="Pending"
        className="unhandled"
      />
    );
  }
}
function DetailedApplicationView(props) {
  return (
    <div
      data-testid="detailed-application-view"
      className="detailed-application-view"
    >
      <h1 data-testid="componenet-header">Applicant Information:</h1>
      {props.application ? (
        <div className="applicant-info">
          <div className="job">
            <p className={`icon-row ${props.application.status}`}>
              {selectPositionIcon(props.application.position)}
            </p>
            <p className="info-row">{props.application.position}</p>
          </div>

          <div className="applicant">
            <p
              data-testid="detailed-application-view-fullname"
              className="info-row"
            >
              Name: {props.application.fullName}
            </p>
            <p
              data-testid="detailed-application-view-experinece"
              className="info-row"
            >
              Experience: {props.application.experience}
            </p>
          </div>

          <div className="period">
            <p className="period-info">Period</p>
            <div className="from-to">
              <p
                data-testid="detailed-application-view-from"
                className="period-info"
              >
                From: {props.application.fromDate}
              </p>
              <p
                data-testid="detailed-application-view-to"
                className="period-info"
              >
                To: {props.application.toDate}
              </p>
            </div>
          </div>

          {!props.editing ? (
            <div className="status">
              <p>{selectStatusIcon(props.application.status)}</p>
              <p>{props.application.status}</p>
            </div>
          ) : (
            <div className="status">
              <select
                className="status-select"
                data-testid="status-select-element"
                title="Status"
                onChange={(e) => {
                  props.updateStatus(e.target.value);
                }}
              >
                <option value="option1">Select status </option>
                {props.status.map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="buttons">
            {!props.editing ? (
              <button onClick={props.edit} className="the-button">
                Edit{" "}
                <FaEdit data-testid="edit-icon" title="Edit" className="icon" />
              </button>
            ) : (
              <div className="buttons">
                <button onClick={props.save} className="the-button">
                  Save
                  <FaRegSave
                    data-testid="save-icon"
                    title="Save"
                    className="icon"
                  />
                </button>
                <button onClick={props.cancel} className="the-button">
                  <label htmlFor=""></label>Cancel
                  <FaRegTimesCircle
                    data-testid="cancel-icon"
                    title="Cancel"
                    className="icon"
                  />
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="no-data">
          <GrDocumentMissing
            data-testid="detailed-application-no-data-icon"
            title="No data loaded"
            className="no-data-icon"
          />
          <label htmlFor="" className="no-data-label" title="No data loaded">
            No Data
          </label>
        </div>
      )}
    </div>
  );
}

export default DetailedApplicationView;
