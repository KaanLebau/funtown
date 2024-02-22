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
  return (
    <div data-testid="head-view" className="head-view-content">
      <div data-testid="head-view-control" className="control">
        <div data-testid="head-view-user-control" className="user-controller">
          {props.active && (
            <>
              {props.user.role === "RECRUITER" ? (
                <>
                  <div
                    data-testid="recruiter-dashboard-element"
                    id="recruiter/dashboard"
                    className="user-controller-element"
                    title={props.language.dashboard}
                    onClick={(e) => props.redirect(e.target.id)}
                  >
                    <MdDashboardCustomize
                      className="elem-icon"
                      data-testid="recruiter-dashboard-icon"
                    />
                    {props.language.dashboard}
                  </div>
                  <div
                    data-testid="recruiter-application-list-element"
                    className="user-controller-element"
                    id="recruiter/applications"
                    title={props.language.applicationList}
                    onClick={(e) => {
                      props.redirect(e.target.id);
                    }}
                  >
                    <MdOutlinePlaylistAddCheck
                      data-testid="recruiter-applicationList-icon"
                      className="elem-icon"
                    />
                    {props.language.applicationList}
                  </div>
                  <div
                    data-testid="recruiter-schedule-element"
                    className="user-controller-element"
                    id="recruiter/schedule"
                    title={props.language.schedule}
                    onClick={(e) => {
                      props.redirect(e.target.id);
                    }}
                  >
                    <AiOutlineSchedule
                      data-testid="recruiter-schedule-icon"
                      className="elem-icon"
                    />
                    {props.language.schedule}
                  </div>
                </>
              ) : (
                <>
                  <div
                    data-testid="user-dashboard-element"
                    id="user/dashboard"
                    className="user-controller-element"
                    title={props.language.dashboard}
                    onClick={(e) => props.redirect(e.target.id)}
                  >
                    <MdDashboardCustomize
                      data-testid="user-dashboard-icon"
                      className="elem-icon"
                    />
                    {props.language.dashboard}
                  </div>
                  <div
                    data-testid="user-application-element"
                    id="user/application"
                    className="user-controller-element"
                    title={props.language.applicationForm}
                    onClick={(e) => {
                      props.redirect(e.target.id);
                    }}
                  >
                    <MdOutlinePlaylistAdd
                      data-testid="user-application-icon"
                      className="elem-icon"
                    />{" "}
                    {props.language.applicationForm}
                  </div>
                </>
              )}
            </>
          )}
        </div>
        <div data-testid="head-view-language-setup" className="language-setup">
          <MdLanguage
            data-testid="language-icon"
            className="icon"
            title="Language"
          />
          <select
            data-testid="language-list"
            title="Select Language"
            onChange={(e) => props.changeLanguage(e.target.value)}
          >
            {props.languageList.map((language) => (
              <option
                data-testid="language-options"
                key={language.language}
                value={language.code}
              >
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
