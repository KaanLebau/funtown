import { Avatar } from "@mui/material";
import "./userInfoView.scss";
import { languageSelector } from "../../model/languageModel";
import { useRecoilValue } from "recoil";
/**
 * UserInfoView component for rendering user information.
 *
 * @component
 * @example
 * // Usage:
 * import UserInfoView from './path/to/UserInfoView';
 *
 * // Example usage in a parent component:
 * <UserInfoView
 *   user={{
 *     firstName: "John",
 *     lastName: "Doe",
 *     username: "john_doe",
 *     email: "john.doe@example.com"
 *   }}
 * />
 *
 * @param {Object} props - The props of the component.
 * @param {Object} props.user - An object containing user information.
 * @param {string} props.user.firstName - The first name of the user.
 * @param {string} props.user.lastName - The last name of the user.
 * @param {string} props.user.username - The username of the user.
 * @param {string} props.user.email - The email address of the user.
 * @returns {JSX.Element} The rendered UserInfoView component.
 */
function UserInfoView(props) {
  const language = useRecoilValue(languageSelector);
  const initials =
    props.user.firstName[0].toUpperCase() +
    props.user.lastName[0].toUpperCase();
  return (
    <div data-testid="user-info-view" className="user-info-view">
      <p data-testid="user-info-title" className="user-info-title">
        {language.userInfoTitle}
      </p>
      <Avatar data-testid="avatar" className="avatar">
        {initials}
      </Avatar>
      <div className="row">
        <label data-testid="name-label" htmlFor="">
          {language.name}:{" "}
        </label>
        <p data-testid="name">
          {props.user.firstName + " " + props.user.lastName}
        </p>
      </div>
      <div className="row">
        <label data-testid="username-label" htmlFor="">
          {language.username}:{" "}
        </label>
        <p data-testid="user-info-username">{props.user.username}</p>
      </div>
      <div className="row">
        <label data-testid="email-label" htmlFor="">
          {language.email}:{" "}
        </label>
        <p data-testid="username">{props.user.email}</p>
      </div>
    </div>
  );
}

export default UserInfoView;
