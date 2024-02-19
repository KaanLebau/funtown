import NotificationPresenter from "../../presenters/notificationPresenter/NotificationPresenter";
import { useLocation } from "react-router-dom";

function NotificationPage(props) {
  const { state } = useLocation();
  return <NotificationPresenter redirect={state.redirect} code={state.code} />;
}

export default NotificationPage;
