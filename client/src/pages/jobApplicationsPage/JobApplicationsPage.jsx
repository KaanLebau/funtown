import "./jobApplicationsPage.scss";
import DetailedApplicationPresenter from "../../presenters/detailedApplicationPresenter/DetailedApplicationPresenter";
import JobTablePresenter from "../../presenters/jobTabelPresenter/JobTablePresenter";
import { useRecoilValue } from "recoil";
import { currentUserState } from "../../model/userModel";
import { useEffect, useState } from "react";
import apiModule from "../../integration/funtownApi";

/**
 * Job Applications Page component.
 *
 * This component displays a page for managing job applications. It consists of a table displaying job application data
 * and a detailed view of individual applications.
 *
 * @component
 * @returns {JSX.Element} The rendered job applications page.
 * @example
 * // Import DashboardPage component
 * import DashboardPage from "/path-to-presenter";
 *
 * // Inside a React functional component
 * return (
 *   <JobapplicationsPage />
 * )
 * @author Kaan
 */
function JobApplicationsPage() {
  const user = useRecoilValue(currentUserState);
  const [detailedInfo, setDetailedInfo] = useState(null);
  const [applicationData, setApplicationData] = useState([]);
  const [tabelLoading, setTableLoading] = useState(true);
  const [detailedLoading, setDetailedLoading] = useState(false);

  async function handleApplicaionDetail(id) {
    setDetailedLoading(true);
    let selectedaspplication = await apiModule.getByApplicationId(
      user.token,
      id
    );
    console.log(selectedaspplication);
    let selectedUser = await apiModule.getUserByUsername(
      user.token,
      selectedaspplication.username
    );
    console.log(selectedUser);
    setDetailedInfo({
      id: selectedaspplication.id,
      firstName: selectedUser.firstName,
      lastName: selectedUser.lastName,
      username: selectedUser.username,
      email: selectedUser.email,
      experience: selectedUser.competenceProfiles,
      fromDate: selectedaspplication.fromDate,
      toDate: selectedaspplication.toDate,
      status: selectedaspplication.status,
      position: selectedaspplication.position,
      contact: selectedaspplication.contact,
    });
    setDetailedLoading(false);
  }

  async function getData() {
    try {
      let list = await apiModule.getAllApplications(user.token);
      setApplicationData(list);
      setTableLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div data-testid="job-applications-page" className="job-application-page">
      <div className="right">
        {tabelLoading ? (
          <h1>Loading</h1>
        ) : (
          <JobTablePresenter
            role={user.role}
            data={applicationData}
            selectedApplication={handleApplicaionDetail}
          />
        )}
      </div>
      <div className="left">
        {detailedLoading ? (
          <h1>Loading</h1>
        ) : (
          <div
            data-testid="job-application-page-detailed-info"
            className="job-application-page-detailed-info"
          >
            <DetailedApplicationPresenter theApplicant={detailedInfo} />
          </div>
        )}
      </div>
    </div>
  );
}

export default JobApplicationsPage;
