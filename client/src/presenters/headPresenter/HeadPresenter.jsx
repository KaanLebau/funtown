import HeadView from "../../views/headView/HeadView";
import { useEffect } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import { currentUserState } from "../../model/userModel";
import "./headPresenter.scss";
import { userLanguageState } from "../../model/languageModel";
import { useNavigate } from "react-router-dom";
/**
 * HeadPresenter component that renders the HeadView with the user and logout function.
 *
 * @return {JSX.Element} The JSX for the HeadPresenter component.
 */
const HeadPresenter = () => {
  const navigate = useNavigate();
  const user = useRecoilValue(currentUserState);
  const [, setRecoilValue] = useRecoilState(userLanguageState);
  function logout() {
    user = null;
  }
  function handleLanguageChange(language) {
    console.log(language);
    setRecoilValue(language);
  }
  function handleRedirect(page) {
    navigate(`./${page}`);
    console.log(page);
  }

  return (
    <div data-testid="head-presenter" className="head-presenter">
      <div>
        <h1 title="Homepage">Funtown</h1>
      </div>
      <HeadView
        user={user}
        logout={logout}
        changeLanguage={handleLanguageChange}
        redirect={handleRedirect}
      />
    </div>
  );
};

export default HeadPresenter;
