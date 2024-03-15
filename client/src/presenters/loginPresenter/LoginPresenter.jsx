import LoginView from "../../views/loginView/LoginView";
import { useRecoilState } from "recoil";
import { currentUserState } from "../../model/userModel";
import { userLoggedIn } from "../../model/userModel";
import { useNavigate } from "react-router-dom";
import apiModule from "../../integration/funtownApi";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";
/**
 * Login Presenter component.
 *
 * This component handles the presentation logic for the login process. It interacts with the LoginView component to
 * render the login form and manages the login state using Recoil state management.
 *
 * @component
 * @returns {JSX.Element} The rendered Login Presenter.
 * @author Kaan
 *
 * @example
 * // Import LoginPresenter component
 * import LoginPresenter from "/path-to-presenter";
 *
 * // Inside a React functional component
 * return (
 *   <LoginPresenter />
 * )
 */
function LoginPresenter() {
  const [user, setUser] = useRecoilState(currentUserState);
  const [loggedIn, setLoggedIn] = useRecoilState(userLoggedIn);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function getApplicantData(auth) {
    console.log(auth);
    const client = await apiModule.getUserByUsername(auth.token, auth.username);
    console.log(client);

    const experience = await apiModule.getUserExperience(
      auth.token,
      auth.username
    );
    const availability = await apiModule.getUserAvailability(
      auth.token,
      auth.username
    );
    setUser({
      firstName: client.firstName,
      lastName: client.lastName,
      username: auth.username,
      email: client.email,
      pnr: client.pnr,
      role: auth.role,
      token: auth.token,
      experience: experience,
      availability: availability,
    });
  }
  async function getRecruiterData(auth) {
    console.log(auth);
    const client = await apiModule.getUserByUsername(auth.token, auth.username);
    setUser({
      firstName: client.firstName,
      lastName: client.lastName,
      username: auth.username,
      email: client.email,
      pnr: client.pnr,
      role: auth.role,
      token: auth.token,
    });
  }
  async function handleLogin(credential) {
    try {
      setLoading(true);
      console.log(credential);
      const client = await apiModule.authenticate(
        credential.username,
        credential.password
      );
      const decoded = jwtDecode(client.access_token);

      const auth = {
        username: decoded.sub,
        role: decoded.roles[0],
        token: client.access_token,
      };
      console.log(auth);

      if (auth.role === "APPLICANT") {
        await getApplicantData(auth);
      } else if (auth.role === "RECRUITER") {
        await getRecruiterData(auth);
      }

      setLoggedIn(true);
      if (auth.role === "APPLICANT") {
        navigate("/user/dashboard", { replace: true });
      } else if (auth.role === "RECRUITER") {
        navigate("/recruiter/dashboard", { replace: true });
      }
    } catch (error) {
      navigate("/notification", {
        replace: true,
        state: { redirect: "/login", code: 401 },
      });
    } finally {
      setLoading(false);
    }
  }
  return (
    <div data-testid="login-presenter">
      <LoginView login={handleLogin} loading={loading} />
    </div>
  );
}

export default LoginPresenter;
