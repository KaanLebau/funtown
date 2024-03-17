import { languageSelector } from "../../model/languageModel";
import { useRecoilValue } from "recoil";
import "./scheduleView.scss";
import { Calendar, dayjsLocalizer } from "react-big-calendar";
import dayjs from "dayjs";

/**
 * ScheduleView component for rendering user schedule.
 *
 * @component
 * @example
 * // Usage:
 * import ScheduleView from './path/to/ScheduleView';
 *
 * // Example usage in a parent component:
 * <ScheduleView
 *   role="RECRUITER"
 *   availability={[
 *     { id: 1, position: "ticket sales", from: "2024-03-01", to: "2024-03-03", status: "accepted" },
 *     { id: 2, position: "Lotterie", from: "2024-03-05", to: "2024-03-07", status: "accepted" },
 *     { id: 3, position: "roller coaster operation", from: "2024-03-10", to: "2024-03-12", status: "accepted" },
 *   ]}
 * />
 *
 * @param {Object} props - The props of the component.
 * @param {string} props.role - The role of the user (either "RECRUITER" or "USER").
 * @param {Array} props.availability - An array of availability objects containing information about scheduled events.
 * @param {number} props.availability[].id - The unique identifier of the event.
 * @param {string} props.availability[].position - The position of the event.
 * @param {string} props.availability[].from - The start date of the event.
 * @param {string} props.availability[].to - The end date of the event.
 * @param {string} props.availability[].status - The status of the event.
 * @returns {JSX.Element} The rendered ScheduleView component.
 */

function ScheduleView(props) {
  const language = useRecoilValue(languageSelector);
  const djLocalizer = dayjsLocalizer(dayjs);

  function getColor(position) {
    switch (position) {
      case "ticket sales":
        return "rgba(204, 135, 31, 0.822)";
      case "Lotterie":
        return "rgba(51, 155, 68, 0.822)";
      case "roller coaster operation":
        return "rgba(170, 60, 93, 0.822)";
      default:
        break;
    }
  }
  function getEventList() {
    let events = [];
    props.availability.map((avail) => {
      if (avail.status === "accepted") {
        events.push({
          id: avail.id,
          title: avail.position,
          start: new Date(avail.from),
          end: new Date(avail.to),
          color: getColor(avail.position),
        });
      }
    });
    return events;
  }
  const eventStyleGetter = (event) => ({
    style: {
      backgroundColor: event.color,
      border: "1px solid #e7f6f2",
    },
  });
  return (
    <div data-testid="schedule-view" className="schedule-view">
      <div className="schedule-view-title-container">
        <h2 data-testid="schedule-view-title" className="schedule-view-title">
          {props.role === "RECRUITER"
            ? language.recruiterScheduleTitle
            : language.userScheduleTitle}
        </h2>
      </div>
      <div className="schedule-view-calender-conteiner">
        <div className="schedule-view-calender">
          <Calendar
            messages={{
              today: language.today, // Customize "Today" button text
              next: language.nextMonth, // Customize "Next" button text
              previous: language.previousMonth, // Customize "Back" button text
            }}
            data-testid="schedule-view-calender"
            localizer={djLocalizer}
            events={getEventList()}
            startAccessor="start"
            endAccessor="end"
            views={["month"]}
            eventPropGetter={eventStyleGetter}
          />
        </div>
      </div>
    </div>
  );
}

export default ScheduleView;
