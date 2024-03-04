import React from "react";
import RegistrationView from "../../views/registrationView/RegistrationView";
import { useNavigate } from "react-router-dom";
import apiModule from "../../integration/funtownApi";
import { currentUserState } from "../../model/userModel";
import { useRecoilState } from "recoil";
import { jwtDecode } from "jwt-decode";
import { userLoggedIn } from "../../model/userModel";

function RegistrationPresenter() {
  const navigate = useNavigate();
  const [user, setUser] = useRecoilState(currentUserState);
  const [loggedIn, setLoggedIn] = useRecoilState(userLoggedIn);

  async function submit(input) {
    const { username, password } = input;

    try {
      const client = await apiModule.registration(username, password);
      const decoded = jwtDecode(client.access_token);
      const role = decoded.role.slice(1, -1);
      console.log(decoded);
      setUser({
        ...user,
        firstName: input.firstName,
        lastName: input.lastName,
        username: input.username,
        email: input.email,
        pnr: input.pnr,
        password: input.password,
        role: role,
      });
      setLoggedIn(true);
      navigate("/notification", {
        replace: true,
        state: { redirect: "/user/dashboard", code: 201 },
      });
    } catch (error) {
      console.error(
        "An error occurred during registration:",
        error.response || error
      );
      navigate("/notification", {
        replace: true,
        state: { redirect: "/user/dashboard", code: 401 },
      });
    }
  }
  return (
    <div data-testid="registration-presenter">
      <RegistrationView onSubmit={submit} />
    </div>
  );
}

export default RegistrationPresenter;
