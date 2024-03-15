import HeadView from "../../views/headView/HeadView";
import { useRecoilValue, useRecoilState } from "recoil";
import { currentUserState, userLoggedIn } from "../../model/userModel";
import "./headPresenter.scss";
import {
  userLanguageState,
  availableLanguagesList,
  languageSelector,
} from "../../model/languageModel";
import { useNavigate } from "react-router-dom";

/**
 * Head Presenter component.
 *
 * This component manages the presentation logic for the application header. It handles user authentication state,
 * language selection, and navigation. It renders the HeadView component to display the header UI elements and handle
 * user interactions.
 *
 * @component
 * @returns {JSX.Element} The rendered Head Presenter.
 * @author Kaan
 *
 * @example
 * // Import HeadPresenter component
 * import HeadPresenter from "/path-to-presenter";
 *
 * // Inside a React functional component
 * return (
 *   <HeadPresenter />
 * )
 */
const HeadPresenter = () => {
  const navigate = useNavigate();
  const [user, setUser] = useRecoilState(currentUserState);
  const [active, setActive] = useRecoilState(userLoggedIn);
  const [, setLanguage] = useRecoilState(userLanguageState);
  const languageList = useRecoilValue(availableLanguagesList);
  const language = useRecoilValue(languageSelector);

  function handleLogout() {
    localStorage.removeItem("currentUserState");
    setActive(false);
    setUser(null);
    navigate("/");
    localStorage.removeItem("userLoggedIn");
    localStorage.removeItem("userLanguageState");
  }

  function handleLanguageChange(newLanguage) {
    setLanguage(newLanguage);
  }

  function handleRedirect(page) {
    navigate(`./${page}`);
  }

  return (
    <div data-testid="head-presenter" className="head-presenter">
      <div>
        <h1 title="Homepage">Funtown</h1>
      </div>
      <HeadView
        user={user}
        logout={handleLogout}
        changeLanguage={handleLanguageChange}
        redirect={handleRedirect}
        language={language}
        active={active}
        languageList={languageList}
      />
    </div>
  );
};

export default HeadPresenter;
