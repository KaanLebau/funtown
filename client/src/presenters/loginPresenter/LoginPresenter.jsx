import React from "react";
import LoginView from "../../views/loginView/LoginView";
import { useRecoilState } from "recoil";
import { userState } from "../../model/userModel";
import { useNavigate } from "react-router-dom";
import apiModule from "../../integration/funtownApi";

function LoginPresenter() {
  const [user, setUser] = useRecoilState(userState);
  const navigate = useNavigate();

  async function handleLogin(credential) {
    try {
      const client = await apiModule.authenticate(
        credential.username,
        credential.password
      );
      console.log(client);
    } catch (error) {}
    //TODO eneble this const user = login(credential.username, credential.password);
    /*
    if (credential.username === "admin") {
      setUser({
        naturalId: "99",
        firstName: "Admin",
        lastName: "Admin",
        username: "admin",
        email: "admin@funtown.com",
        pnr: "12342211-4444",
        role: "recruiter",
      });
      navigate("/recruiter");
    } else {
      setUser({
        naturalId: "1",
        firstName: "Jhon",
        lastName: "Doe",
        username: "jhonny",
        email: "jhon@doe.com",
        pnr: "12342211-4444",
        role: "applicant",
      });
      navigate("/user");
    }*/
  }
  return (
    <div data-testid="login-presenter">
      <LoginView login={handleLogin} />
    </div>
  );
}

export default LoginPresenter;
