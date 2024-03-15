import "./schedulePage.scss";
import { currentUserState } from "../../model/userModel";
import ScheduleView from "../../views/scheduleView/ScheduleView";
import { useRecoilValue } from "recoil";
import { useEffect, useState } from "react";
import mockApi from "../../integration/mockapi";
import { useNavigate } from "react-router-dom";

/**
 * Schedule page component.
 *
 * This component fetches schedule data from an API and renders a schedule view.
 * It displays a loading indicator while fetching data and handles errors by navigating
 * to the notification page with appropriate error codes.
 *
 * @component
 * @example
 * ```jsx
 * import { SchedulePage } from "/path-to-presenter";
 *
 * <SchedulePage />
 * ```
 * @returns {JSX.Element} The rendered schedule page.
 * @author Kaan
 */
function SchedulePage() {
  const user = useRecoilValue(currentUserState);
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [isloading, setIsloading] = useState(true);
  async function fetchData() {
    try {
      const applications = await mockApi.getAllApplications();
      setApplications(applications);
      setIsloading(false);
    } catch (error) {
      setIsloading(false);
      navigate("/notification", {
        replace: true,
        state: { redirect: "/user/dashboard", code: error.code },
      });
    }
  }
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="schedule-page-content">
      {isloading ? (
        <div data-testid="schedule-page-loading">LOading</div>
      ) : (
        <div data-testid="schedule-view-wrapper" className="schedule-wrapper">
          <ScheduleView role={user.role} availability={applications} />
        </div>
      )}
    </div>
  );
}

export default SchedulePage;
