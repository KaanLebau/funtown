import { useEffect, useState } from "react";
import TabelPresenter from "../tablePresenter/TablePresenter";
import DetailedApplicationPresenter from "../detailedApplicationPresenter/DetailedApplicationPresenter";
import "./recruiterWorkPlanePresenter.scss";

function RecruiterWorkPlanePresenter(props) {
  const [detailed, setDetailed] = useState();
  function handleSelectedApplicant(id) {
    setDetailed(id);
  }
  useEffect(() => {}, [detailed]);
  return (
    <div
      data-testid="recruiter-work-plane-presenter"
      className="work-plane-presenter"
    >
      <div className="all-applications">
        <TabelPresenter
          allApplicants={props.applicants}
          applicant={handleSelectedApplicant}
        />
      </div>
      <div className="detailed-application">
        <DetailedApplicationPresenter theApplicant={detailed} />
      </div>
    </div>
  );
}

export default RecruiterWorkPlanePresenter;
