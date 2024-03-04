import React, { useEffect, useState } from "react";
import DetailedApplicationView from "../../views/detailedApplicationView/DetailedApplicationView";
import { useRecoilValue } from "recoil";
import { statusOptions } from "../../model/businessModel";

/**
 * DetailedApplicationPresenter component function.
 *
 * @param {Object} props - the props object
 * @return {JSX.Element} the DetailedApplicationPresenter component
 */
function DetailedApplicationPresenter(props) {
  const statusList = useRecoilValue(statusOptions);
  const [application, setApplication] = useState(props.theApplicant);
  const [updated, setUpdate] = useState(application);
  const [editing, setEditing] = useState(false);

  function handleEdit() {
    setApplication(updated);
    setEditing(!editing);
  }
  function handleStatus(status) {
    console.log("h");
    //setUpdate({ ...updated, ["status"]: status });
  }
  useEffect(() => {
    setApplication(props.theApplicant);
    setUpdate(props.theApplicant);
  }, [application, updated, props.theApplicant]);
  return (
    <div
      style={{ width: "inherit", height: "100%" }}
      data-testid="detailed-application-presenter"
    >
      <DetailedApplicationView
        application={application}
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
