import React from "react";
import LoginView from "../../views/loginView/LoginView";
import { useRecoilState } from "recoil";
import { currentUserState } from "../../model/userModel";
import { userLoggedIn } from "../../model/userModel";
import { useNavigate } from "react-router-dom";
import apiModule from "../../integration/funtownApi";
import { jwtDecode } from "jwt-decode";

function LoginPresenter() {
  const [user, setUser] = useRecoilState(currentUserState);
  const [loggedIn, setLoggedIn] = useRecoilState(userLoggedIn);
  const navigate = useNavigate();

  async function handleLogin(credential) {
    try {
      const client = await apiModule.authenticate(
        credential.username,
        credential.password
      );
      const decoded = jwtDecode(client.access_token);
      const username = decoded.sub;
      const role = decoded.role.slice(1, -1);
      if (username === "admin") {
        setUser({
          ...user,
          firstName: "John",
          lastName: "Doe",
          username: username,
          email: "jhon@funtown.com",
          pnr: "11112233-4444",
          role: role,
        });
        setLoggedIn(true);
      } else if (username === "Janie") {
        setUser({
          ...user,
          firstName: "jane",
          lastName: "Doe",
          username: username,
          email: "jane@notmy.com",
          pnr: "11112233-4444",
          role: role,
        });
        setLoggedIn(true);
      }
      setLoggedIn(true);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div data-testid="login-presenter">
      <LoginView login={handleLogin} />
    </div>
  );
}

export default LoginPresenter;
