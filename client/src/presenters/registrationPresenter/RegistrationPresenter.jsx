import React from "react";
import RegistrationView from "../../views/registrationView/RegistrationView";
import { useNavigate } from "react-router-dom";
import apiModule from "../../integration/funtownApi";
import { currentUserState } from "../../model/userModel";
import { useRecoilState } from "recoil";
import { jwtDecode } from "jwt-decode";
import { userLoggedIn } from "../../model/userModel";

/**
 * Registration Presenter component.
 *
 * This component handles the presentation logic for user registration. It interacts with the RegistrationView component to display the registration form and communicates with the backend API to register the user. Upon successful registration, it updates the user state and redirects to the dashboard page. In case of an error, it displays a notification.
 *
 * @component
 * @returns {JSX.Element} The rendered Registration Presenter.
 * @author Kaan
 *
 * @example
 * // Import RegistrationPresenter component
 * import RegistrationPresenter from "/path-to-presenter";
 *
 * // Inside a React functional component
 * return (
 *   <RegistrationPresenter />
 * )
 */
function RegistrationPresenter() {
  const navigate = useNavigate();
  const [user, setUser] = useRecoilState(currentUserState);
  const [loggedIn, setLoggedIn] = useRecoilState(userLoggedIn);

  async function submit(input) {
    const { username, password } = input;

    try {
      const client = await apiModule.registration(username, password); //uath-service
      const decoded = jwtDecode(client.access_token);
      console.log("auth done");
      const userInfo = await apiModule.registerUserInfo(client.access_token, {
        firstName: input.firstName,
        lastName: input.lastName,
        username: input.username,
        email: input.email,
        pnr: input.pnr,
      }); //user-service
      //const positions = await apiModule.getPositionList(client.access_token);
      console.log("user service works");
      setUser({
        ...user,
        id: userInfo.id,
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        username: input.username,
        email: userInfo.email,
        pnr: userInfo.pnr,
        password: input.password,
        token: client.access_token,
        role: decoded.roles[0],
        experience: [],
        availability: [],
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
        state: { redirect: "/registration", code: 401 },
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
