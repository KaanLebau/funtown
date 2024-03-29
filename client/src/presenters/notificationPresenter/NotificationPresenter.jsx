import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { languageSelector } from "../../model/languageModel";
import { useRecoilValue } from "recoil";
/**
 * Notification Presenter component.
 *
 * This component handles the presentation logic for displaying notifications based on the provided code.
 * It selects the appropriate message and description based on the code and renders the NotificationView
 * component to display the notification.
 *
 * @component
 * @param {Object} props - The props for the Notification Presenter component.
 * @param {number} props.code - The code associated with the notification type.
 * @param {string} props.redirect - The path to redirect after displaying the notification.
 * @returns {JSX.Element} The rendered Notification Presenter.
 * @author Kaan
 *
 * @example
 * // Import NotificationPresenter component
 * import NotificationPresenter from "/path-to-presenter";
 *
 * // Inside a React functional component, providing the code and redirect path
 * return (
 *   <NotificationPresenter code={401} redirect="/login" />
 * )
 */
import NotificationView from "../../views/notificationView/NotificationView";
function NotificationPresenter(props) {
  const language = useRecoilValue(languageSelector);
  let information;

  switch (props.code) {
    case 201:
      information = {
        icon: "success",
        code: props.code,
        msg: language.registered,
        desc: language.registredDesc,
        redirect: language.redirect,
        redirectPath: props.redirect,
      };
      break;
    case 210:
      information = {
        icon: "applied",
        code: props.code,
        msg: language.applied,
        desc: language.appliedDesc,
        redirect: language.redirect,
        redirectPath: props.redirect,
      };
      break;
    case 211:
      information = {
        icon: "updated",
        code: props.code,
        msg: language.competence,
        desc: language.competenceDesc,
        redirect: language.redirect,
        redirectPath: props.redirect,
      };
      break;
    case 401:
      information = {
        icon: "unAuth",
        code: props.code,
        msg: language.unAuth,
        desc: language.unAuthDesc,
        redirect: language.redirect,
        redirectPath: props.redirect,
      };
      break;
    case 503:
      information = {
        icon: "server",
        code: props.code,
        msg: language.server,
        desc: language.serverDesc,
        redirect: language.redirect,
        redirectPath: props.redirect,
      };
      break;
    default:
      information = {
        icon: "",
        code: props.code,
        msg: language.unknown,
        desc: language.unknownDesc,
        redirect: language.redirect,
        redirectPath: "",
      };
      break;
  }

  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate(props.redirect, { replace: true });
    }, 3000);

    return () => clearTimeout(timeout);
  }, [navigate]);

  return (
    <div
      data-testid="notification-presenter-componenet"
      className="notifications-presenter"
    >
      <NotificationView information={information} />;
    </div>
  );
}

export default NotificationPresenter;
