import { languageSelector } from "../../model/languageModel";
import { useRecoilValue } from "recoil";
import "./scheduleView.scss";
import { Calendar, dayjsLocalizer } from "react-big-calendar";
import dayjs from "dayjs";

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
