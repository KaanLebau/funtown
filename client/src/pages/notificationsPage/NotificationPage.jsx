import NotificationPresenter from "../../presenters/notificationPresenter/NotificationPresenter";
import { useLocation } from "react-router-dom";
/**
 * Notification page component.
 *
 * This component displays notifications based on the state received from the location.
 * It extracts the state from the URL using the useLocation hook provided by react-router-dom
 * and passes it to the NotificationPresenter component to render the notifications.
 *
 * @example
 * ```jsx
 * import NotificationPage from "/path-to-presenter";
 *
 * <NotificationPage />
 *```
 * @component
 * @returns {JSX.Element} The rendered notification page.
 * @author Kaan
 *
 *
 */
function NotificationPage() {
  const { state } = useLocation();

  return (
    <NotificationPresenter
      data-testid="notification-presenter-component"
      redirect={state.redirect}
      code={state.code}
    />
  );
}

export default NotificationPage;
