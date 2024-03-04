import "./jobApplicationsPage.scss";
import DetailedApplicationPresenter from "../../presenters/detailedApplicationPresenter/DetailedApplicationPresenter";

function JobApplicationsPage() {
  const applicationData = [
    {
      position: "roller coaster operation",
      fullName: "bon jovi",
      experience: [
        { position: "ticket sales", experience: "0 -> 1 year" },
        { position: "roller coaster operation", experience: "1.1 -> 2 year" },
        { position: "lotteries", experience: "2.1 -> 3" },
      ],
      fromDate: "2023-01-01",
      toDate: "2023-12-31",
      status: "accepted",
      contact: "Ali",
    },
    {
      position: "",
      fullName: "janie bone",
      experience: [
        { position: "ticket sales", experience: "0 -> 1 year" },
        { position: "roller coaster operation", experience: "1.1 -> 2 year" },
      ],
      fromDate: "2023-01-01",
      toDate: "2023-12-31",
      status: "rejected",
      contact: "Ali",
    },
    {
      position: "",
      fullName: "John Snow",
      experience: [
        { position: "ticket sales", experience: "0 -> 1 year" },
        { position: "roller coaster operation", experience: "1.1 -> 2 year" },
      ],
      fromDate: "2023-01-01",
      toDate: "2023-12-31",
      status: "unhandled",
      contact: "",
    },
    {
      position: "",
      fullName: "joe thri",
      experience: [],
      fromDate: "2023-01-01",
      toDate: "2023-12-31",
      status: "unhandled",
      contact: "",
    },
  ];
  return (
    <div data-testid="job-applications-page" className="job-application-page">
      <div className="right"> right</div>
      <div className="left">
        <div
          data-testid="job-application-page-detailed-info"
          className="job-application-page-detailed-info"
        >
          <DetailedApplicationPresenter theApplicant={applicationData[0]} />
        </div>
      </div>
    </div>
  );
}

export default JobApplicationsPage;
