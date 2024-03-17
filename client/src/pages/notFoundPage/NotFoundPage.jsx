import "./notFoundPage.scss";

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
 */
import { useLocation } from "react-router-dom";
function NotFoundPage() {
  const location = useLocation();
  return (
    <div data-testid="not-found" className="not-found">
      <div data-testid="not-found-page" className="not-found-page">
        <p data-testid="info-text">The page you are looking</p>
        <p data-testid="info-path">{location.pathname}</p>
        <p data-testid="info-code">was not found 404</p>
      </div>
    </div>
  );
}

export default NotFoundPage;
