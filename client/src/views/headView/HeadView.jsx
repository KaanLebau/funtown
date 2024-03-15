import "./headView.scss";
import { MdDashboardCustomize } from "react-icons/md";
import {
  MdLanguage,
  MdOutlinePlaylistAdd,
  MdOutlinePlaylistAddCheck,
  MdOutlineLogout,
} from "react-icons/md";
import { AiOutlineSchedule } from "react-icons/ai";
import {
  availableLanguagesList,
  languageSelector,
} from "../../model/languageModel";
import { useRecoilValue } from "recoil";
import { userLoggedIn } from "../../model/userModel";

/**
 * HeadView component for displaying user controls and language selection.
 *
 * @component
 * @example
 * // Usage:
 * import HeadView from './path/to/HeadView';
 *
 * // Example usage in a parent component:
 * <HeadView
 *   active={true}
 *   user={{ role: 'RECRUITER' }}
 *   language={{
 *     dashboard: 'Dashboard',
 *     applicationList: 'Application List',
 *     schedule: 'Schedule',
 *     logout: 'Logout',
 *     applicationForm: 'Application Form',
 *   }}
 *   languageList={[
 *     { language: 'English', code: 'en' },
 *     { language: 'French', code: 'fr' },
 *     { language: 'Spanish', code: 'es' },
 *   ]}
 *   redirect={(id) => console.log('Redirect to:', id)}
 *   logout={() => console.log('User logged out')}
 *   changeLanguage={(language) => console.log('Language changed to:', language)}
 * />
 *
 * @param {Object} props - The props of the component.
 * @param {boolean} props.active - Flag indicating whether the component is active.
 * @param {Object} props.user - The user object.
 * @param {string} props.user.role - The role of the user.
 * @param {Object} props.language - The language object containing language-specific strings.
 * @param {Array} props.languageList - The list of available languages.
 * @param {Function} props.redirect - Function to handle redirection.
 * @param {Function} props.logout - Function to handle user logout.
 * @param {Function} props.changeLanguage - Function to handle language change.
 * @returns {JSX.Element} The rendered HeadView component.
 * @author Kaan
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
                  <div
                    data-testid="user-application-element"
                    id="/"
                    className="user-controller-element"
                    title={props.language.logout}
                    onClick={(e) => {
                      props.props.logout();
                    }}
                  >
                    <MdOutlineLogout
                      data-testid="user-application-icon"
                      className="elem-icon"
                    />{" "}
                    {props.language.logout}
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
                  <div
                    data-testid="user-application-element"
                    id="/"
                    className="user-controller-element"
                    title={props.language.logout}
                    onClick={(e) => {
                      props.logout();
                    }}
                  >
                    <MdOutlineLogout
                      data-testid="user-application-icon"
                      className="elem-icon"
                    />{" "}
                    {props.language.logout}
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
