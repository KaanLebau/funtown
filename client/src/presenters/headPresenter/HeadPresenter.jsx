import HeadView from "../../views/headView/HeadView";
import React, { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { userState } from "../../model/userModel";

/**
 * HeadPresenter component that renders the HeadView with the user and logout function.
 *
 * @return {JSX.Element} The JSX for the HeadPresenter component.
 */
const HeadPresenter = () => {
  const user = useRecoilValue(userState);
  function logout() {
    user = null;
  }

  return (
    <div data-testid="head-presenter">
      <HeadView user={user} logout={logout} />
    </div>
  );
};

export default HeadPresenter;
