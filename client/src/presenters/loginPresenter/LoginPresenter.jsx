import React from "react";
import LoginView from "../../views/loginView/LoginView";
import { useRecoilState } from "recoil";
import { currentUserState } from "../../model/userModel";
import { useNavigate } from "react-router-dom";
import apiModule from "../../integration/funtownApi";

function LoginPresenter() {
  const [user, setUser] = useRecoilState(currentUserState);
  const navigate = useNavigate();

  async function handleLogin(credential) {
    try {
      const client = await apiModule.authenticate(
        credential.username,
        credential.password
      );
      setUser(client);
    } catch (error) {}
  }
  return (
    <div data-testid="login-presenter">
      <LoginView login={handleLogin} />
    </div>
  );
}

export default LoginPresenter;
