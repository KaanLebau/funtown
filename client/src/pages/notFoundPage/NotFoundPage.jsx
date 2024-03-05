import "./notFoundPage.scss";
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
