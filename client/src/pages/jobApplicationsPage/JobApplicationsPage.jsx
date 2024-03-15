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
  const applicationsData = [
    {
      id: 14,
      firstName: "Bon",
      lastName: "Jovi",
      username: "bonJovi",
      email: "bon@jovi.com",
      pnr: "",
      role: "APPLICANT",
      experience: [
        { position: "ticket sales", experience: "0 -> 1 year" },
        { position: "roller coaster operation", experience: "1.1 -> 2 year" },
        { position: "lotteries", experience: "2.1 -> 3" },
      ],
      fromDate: "2023-01-01",
      toDate: "2023-12-31",
      status: "accepted",
      position: "roller coaster operation",
      contact: "Ali",
    },
    {
      id: 2,
      firstName: "Axl",
      lastName: "Rose",
      username: "WaR",
      email: "axl@rose.com",
      pnr: "",
      role: "APPLICANT",
      experience: [
        { position: "ticket sales", experience: "0 -> 1 year" },
        { position: "roller coaster operation", experience: "1.1 -> 2 year" },
      ],
      fromDate: "2023-01-01",
      toDate: "2023-12-31",
      status: "rejected",
      position: "",
      contact: "Ali",
    },
    {
      id: 32,
      firstName: "Duff",
      lastName: "Mckagan",
      username: "duffy",
      email: "duff@mckagan.com",
      pnr: "",
      role: "APPLICANT",
      experience: [
        { position: "ticket sales", experience: "0 -> 1 year" },
        { position: "roller coaster operation", experience: "1.1 -> 2 year" },
      ],
      fromDate: "2023-01-01",
      toDate: "2023-12-31",
      position: "",
      status: "unhandled",
      contact: "",
    },
    {
      id: 23,
      firstName: "Richie",
      lastName: "Sambora",
      username: "richie",
      email: "ric@sambora.com",
      pnr: "",
      role: "APPLICANT",
      experience: [
        { position: "ticket sales", experience: "0 -> 1 year" },
        { position: "roller coaster operation", experience: "1.1 -> 2 year" },
      ],
      position: "",
      fromDate: "2023-01-01",
      toDate: "2023-12-31",
      status: "unhandled",
      contact: "",
    },
  ];

  function handleApplicaionDetail(id) {
    console.log(id);
    //TODO apiCall
    applicationData.map((item) => {
      if (item.id === id) {
        setDetailedInfo(item);
      }
    });
  }

  async function getData() {
    try {
      let list = await apiModule.getAllApplications(user.token);
      setApplicationData(list);
      console.log(applicationData);
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
        <JobTablePresenter
          role={user.role}
          data={applicationData}
          selectedApplication={handleApplicaionDetail}
        />
      </div>
      <div className="left">
        <div
          data-testid="job-application-page-detailed-info"
          className="job-application-page-detailed-info"
        >
          <DetailedApplicationPresenter theApplicant={detailedInfo} />
        </div>
      </div>
    </div>
  );
}

export default JobApplicationsPage;
