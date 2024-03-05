import "./notificationView.scss";
import {
  FaLock,
  FaCheck,
  FaRegTimesCircle,
  FaCalendarCheck,
  FaClipboardCheck,
} from "react-icons/fa";

function NotificationView(props) {
  console.log(props.information);
  function selectIcon(icon) {
    switch (icon) {
      case "unAuth":
        return <FaLock className="notification-icon" />;
      case "success":
        return <FaCheck className="notification-icon" />;
      case "applied":
        return <FaCalendarCheck className="notification-icon" />;
      case "updated":
        return <FaClipboardCheck className="notification-icon" />;
      default:
        return <FaRegTimesCircle className="notification-icon" />;
    }
  }

  return (
    <div data-testid="notification-view" className="notification-view-content">
      <div className="border">
        <>{selectIcon(props.information.icon)}</>
        <h1 className="notification-code">{props.information.code}</h1>
        <h2 className="notification-code">{props.information.msg}</h2>
        <p className="notification-code">{props.information.desc}</p>
        <p className="notification-code">
          {props.information.redirect + props.information.redirectPath}
        </p>
      </div>
    </div>
  );
}

export default NotificationView;
