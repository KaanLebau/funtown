import "./headView.scss";
import { MdDashboardCustomize } from "react-icons/md";
import {
  MdLanguage,
  MdOutlinePlaylistAdd,
  MdOutlinePlaylistAddCheck,
} from "react-icons/md";
import { AiOutlineSchedule } from "react-icons/ai";
import {
  availableLanguagesList,
  languageSelector,
} from "../../model/languageModel";
import { useRecoilValue } from "recoil";
import { userLoggedIn } from "../../model/userModel";

/**
 * Renders the head view for the user.
 * This component is responsible for rendering the header of the application,
 * including the site title and, if a user is present, a logout button.
 *
 * @component
 * @param {object} props - The props object containing user information.
 * @param {object} props.user - The user object, indicating if a user is logged in.
 * @param {function} props.logout - The function to be called when the logout button is clicked.
 * @returns {JSX.Element} The rendered head view component.
 */
const HeadView = (props) => {
  const languageList = useRecoilValue(availableLanguagesList);
  const active = useRecoilValue(userLoggedIn);
  const language = useRecoilValue(languageSelector);

  return (
    <div data-testid="head-view" className="head-view-content">
      <div className="control">
        <div className="user-controller">
          {active && <></>}
          {props.user.role === "RECRUITER" ? (
            <>
              <div
                id="recruiter/dashboard"
                className="user-controller-element"
                title={language.dashboard}
                onClick={(e) => props.redirect(e.target.id)}
              >
                <MdDashboardCustomize className="elem-icon" />
                {language.dashboard}
              </div>
              <div
                className="user-controller-element"
                id="recruiter/applications"
                title={language.applicationList}
                onClick={(e) => {
                  props.redirect(e.target.id);
                }}
              >
                <MdOutlinePlaylistAddCheck className="elem-icon" />
                {language.applicationList}
              </div>
              <div
                className="user-controller-element"
                id="recruiter/schedule"
                title={language.schedule}
                onClick={(e) => {
                  props.redirect(e.target.id);
                }}
              >
                <AiOutlineSchedule className="elem-icon" />
                {language.schedule}
              </div>
            </>
          ) : (
            <>
              <div
                id="user/dashboard"
                className="user-controller-element"
                title={language.dashboard}
                onClick={(e) => props.redirect(e.target.id)}
              >
                <MdDashboardCustomize className="elem-icon" />
                {language.dashboard}
              </div>
              <div
                id="user/application"
                className="user-controller-element"
                title={language.applicationForm}
                onClick={(e) => {
                  props.redirect(e.target.id);
                }}
              >
                <MdOutlinePlaylistAdd className="elem-icon" />{" "}
                {language.applicationForm}
              </div>
            </>
          )}
        </div>
        <div className="language-setup">
          <MdLanguage className="icon" title="Language" />
          <select
            title="Select Language"
            onChange={(e) => props.changeLanguage(e.target.value)}
          >
            {languageList.map((language) => (
              <option key={language.language} value={language.code}>
                {language.language}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default HeadView;
