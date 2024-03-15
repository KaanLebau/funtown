import "./notificationView.scss";
import {
  FaLock,
  FaCheck,
  FaRegTimesCircle,
  FaCalendarCheck,
  FaClipboardCheck,
} from "react-icons/fa";
import { LuServerCrash } from "react-icons/lu";
/**
 * NotificationView component for rendering notification messages.
 *
 * @component
 * @example
 * // Usage:
 * import NotificationView from './path/to/NotificationView';
 *
 * // Example usage in a parent component:
 * <NotificationView
 *   information={{
 *     icon: "success",
 *     code: "200",
 *     msg: "Success!",
 *     desc: "Your action was successful.",
 *     redirect: "Redirecting to ",
 *     redirectPath: "/dashboard",
 *   }}
 * />
 *
 * @param {Object} props - The props of the component.
 * @param {Object} props.information - Information object containing notification details.
 * @param {string} props.information.icon - Icon type for the notification.
 * @param {string} props.information.code - Code associated with the notification.
 * @param {string} props.information.msg - Message of the notification.
 * @param {string} props.information.desc - Description of the notification.
 * @param {string} props.information.redirect - Text indicating redirection.
 * @param {string} props.information.redirectPath - Path to redirect.
 * @returns {JSX.Element} The rendered NotificationView component.
 */
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
      case "server":
        return (
          <LuServerCrash
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
