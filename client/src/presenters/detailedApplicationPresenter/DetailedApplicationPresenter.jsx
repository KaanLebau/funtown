import React, { useEffect, useState } from "react";
import DetailedApplicationView from "../../views/detailedApplicationView/DetailedApplicationView";
import { useRecoilValue } from "recoil";
import { statusOptions } from "../../model/businessModel";
import { currentUserState } from "../../model/userModel";

/**
 * DetailedApplicationPresenter component function.
 *
 * @param {Object} props - the props object
 * @return {JSX.Element} the DetailedApplicationPresenter component
 */
function DetailedApplicationPresenter(props) {
  const currentUser = useRecoilValue(currentUserState);
  const statusList = useRecoilValue(statusOptions);
  const [application, setApplication] = useState(props.theApplicant);
  const [updatedApplication, setUpdatedApplication] = useState(application);
  const [editing, setEditing] = useState(false);
  const [newData, setNewData] = useState(false);

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
