import "./notificationView.scss";
import {
  FaLock,
  FaCheck,
  FaRegTimesCircle,
  FaCalendarCheck,
  FaClipboardCheck,
} from "react-icons/fa";

function NotificationView(props) {
  function selectIcon(icon) {
    switch (icon) {
      case "unAuth":
        return (
          <FaLock
            data-testid="notification-icon-unAuth"
            className="notification-icon"
          />
        );
      case "success":
        return (
          <FaCheck
            data-testid="notification-icon-success"
            className="notification-icon"
          />
        );
      case "applied":
        return (
          <FaCalendarCheck
            data-testid="notification-icon-applied"
            className="notification-icon"
          />
        );
      case "updated":
        return (
          <FaClipboardCheck
            data-testid="notification-icon-updated"
            className="notification-icon"
          />
        );
      default:
        return (
          <FaRegTimesCircle
            data-testid="notification-icon"
            className="notification-icon"
          />
        );
    }
  }

  return (
    <div
      data-testid="notification-view-content"
      className="notification-view-content"
    >
      <div className="border">
        <>{selectIcon(props.information.icon)}</>
        <h1 data-testid="notification-code" className="notification-code">
          {props.information.code}
        </h1>
        <h2 data-testid="notification-msg" className="notification-code">
          {props.information.msg}
        </h2>
        <p data-testid="notification-desc" className="notification-code">
          {props.information.desc}
        </p>
        <p data-testid="notification-redirection" className="notification-code">
          {props.information.redirect + props.information.redirectPath}
        </p>
      </div>
    </div>
  );
}

export default NotificationView;
