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
 * HeadPresenter component that renders the HeadView with the user and logout function.
 *
 * @return {JSX.Element} The JSX for the HeadPresenter component.
 */
const HeadPresenter = () => {
  const navigate = useNavigate();
  const [user, setUser] = useRecoilState(currentUserState);
  const [active, setActive] = useRecoilState(userLoggedIn);
  const [, setLanguage] = useRecoilState(userLanguageState);
  const languageList = useRecoilValue(availableLanguagesList);
  const language = useRecoilValue(languageSelector);
  /**
   * Function to logout the userPuser
   */
  function handleLogout() {
    localStorage.removeItem("currentUserState");
    setActive(false);
    setUser(null);
    navigate("/");
    localStorage.removeItem("userLoggedIn");
    localStorage.removeItem("userLanguageState");
  }
  /**
   * Function to handle language change
   * @param {string} language - The new language to set
   */
  function handleLanguageChange(newLanguage) {
    setLanguage(newLanguage);
  }
  /**
   * Function to handle page redirect
   * @param {string} page - The page to redirect to
   */
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
