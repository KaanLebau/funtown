import "./recruiterPage.scss";
import { competence_distribution } from "../../model/mockdata";
import HeadPresenter from "../../presenters/headPresenter/HeadPresenter";
import RecruiterWorkPlanePresenter from "../../presenters/recruiterWorkPlanePresenter/RecruiterWorkPlanePresenter";
const elements = [
  {
    id: 1,
    fullName: "Jhon Doe",
    experience: 1.2,
    position: "ticket sales",
    fromDate: "2022-01-01",
    toDate: "2022-01-11",
    status: "accepted",
  },
  {
    id: 2,
    fullName: "Jhon Doe",
    experience: 1.2,
    position: "ticket sales",
    fromDate: "2022-02-01",
    toDate: "2022-02-11",
    status: "rejected",
  },
  {
    id: 3,
    fullName: "Jhon Doe",
    experience: 1.2,
    position: "ticket sales",
    fromDate: "2022-01-01",
    toDate: "2022-01-11",
    status: "unhandled",
  },
  {
    id: 11,
    fullName: "Jhon Doe",
    experience: 1.2,
    position: "roller coaster operation",
    fromDate: "2022-01-01",
    toDate: "2022-01-11",
    status: "accepted",
  },
  {
    id: 12,
    fullName: "Jhon Doe",
    experience: 1.2,
    position: "roller coaster operation",
    fromDate: "2022-01-01",
    toDate: "2022-01-11",
    status: "rejected",
  },
  {
    id: 13,
    fullName: "Jhon Doe",
    experience: 1.2,
    position: "roller coaster operation",
    fromDate: "2022-01-01",
    toDate: "2022-01-11",
    status: "unhandled",
  },
  {
    id: 21,
    fullName: "Jhon Doe",
    experience: 1.2,
    position: "lotteries",
    fromDate: "2022-01-01",
    toDate: "2022-01-11",
    status: "accepted",
  },
  {
    id: 22,
    fullName: "Jhon Doe",
    experience: 1.2,
    position: "lotteries",
    fromDate: "2022-01-01",
    toDate: "2022-01-11",
    status: "rejected",
  },
  {
    id: 23,
    fullName: "jane Doe",
    experience: 1.2,
    position: "lotteries",
    fromDate: "2022-01-01",
    toDate: "2022-01-11",
    status: "unhandled",
  },
];
function RecruiterPage() {
  return (
    <div data-testid="recruiter-page" className="recuiter-page">
      <div>
        <HeadPresenter />
      </div>
      <div className="work-plane">
        <div className="aplications">
          <RecruiterWorkPlanePresenter applicants={elements} />
        </div>
      </div>
    </div>
  );
}

export default RecruiterPage;
