import React, { useEffect, useState } from "react";
import DetailedApplicationView from "../../views/detailedApplicationView/DetailedApplicationView";
import { useRecoilValue } from "recoil";
import { statusOptions } from "../../model/businessModel";
import { currentUserState } from "../../model/userModel";

/**
 * Detailed Application Presenter component.
 *
 * This component manages the presentation logic for displaying and editing detailed application information.
 * It handles editing application status, saving changes, and updating the backend. It renders the DetailedApplicationView
 * component to display the application details and provide user interaction.
 *
 * @component
 * @param {Object} props - The properties passed to the component.
 * @param {Object} props.theApplicant - The application data to be displayed.
 * @returns {JSX.Element} The rendered Detailed Application Presenter.
 * @author Kaan
 *
 * @example
 * // Import DetailedApplicationPresenter component
 * import DetailedApplicationPresenter from "/path-to-presenter";
 *
 * // Inside a React functional component
 * const applicationData = {
 *   id: 14,
 *   firstName: "Bon",
 *   lastName: "Jovi",
 *   // Additional application fields...
 * };
 *
 * return (
 *   <DetailedApplicationPresenter theApplicant={applicationData} />
 * )
 */
function DetailedApplicationPresenter(props) {
  const currentUser = useRecoilValue(currentUserState);
  const statusList = useRecoilValue(statusOptions);
  const [application, setApplication] = useState(props.theApplicant);
  const [updatedApplication, setUpdatedApplication] = useState(application);
  const [editing, setEditing] = useState(false);
  const [newData, setNewData] = useState(false);
  console.log(props.theApplicant);
  function handleEdit() {
    setEditing(!editing);
  }
  function handleStatus(input) {
    setUpdatedApplication({
      ...updatedApplication,
      status: input.status,
      position: input.position,
      contact: currentUser.firstName,
    });
    setNewData(true);
    setEditing(!editing);
  }
  function updateBackend() {
    console.log("backend call");
  }
  useEffect(() => {
    if (!newData) {
      setUpdatedApplication(props.theApplicant);
    }
    if (newData) {
      updateBackend();
    }
  }, [updatedApplication, application, props.theApplicant]);
  return (
    <div
      style={{ width: "inherit", height: "100%" }}
      data-testid="detailed-application-presenter"
    >
      <DetailedApplicationView
        application={updatedApplication}
        editing={editing}
        edit={() => {
          setEditing(!editing);
        }}
        cancel={() => {
          setEditing(false);
        }}
        save={handleEdit}
        status={statusList}
        updateStatus={handleStatus}
      />
    </div>
  );
}

export default DetailedApplicationPresenter;
