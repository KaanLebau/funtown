import { useLocation } from "react-router-dom";

function NotFoundPage() {
  let location = useLocation();
  return (
    <div data-testId="not-found-page">
      <div data-testId="not-found-page-content">
        <p data-testId="not-found-page-info">Page you lookin for</p>
        <p dat-testId="not-found-page-path">{location.pathname}</p>
        <p data-testId="not-found-page-not-state">404 not found</p>
      </div>
    </div>
  );
}

export default NotFoundPage;
