import LoginView from "../../views/loginView/LoginView";
import { useRecoilState } from "recoil";
import { currentUserState } from "../../model/userModel";
import { userLoggedIn } from "../../model/userModel";
import { useNavigate } from "react-router-dom";
import apiModule from "../../integration/funtownApi";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";

function LoginPresenter() {
  const [user, setUser] = useRecoilState(currentUserState);
  const [loggedIn, setLoggedIn] = useRecoilState(userLoggedIn);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function getApplicantData(auth) {
    const client = await apiModule.getUserByUsername(auth.token, auth.username);

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
      /*
      const client = await apiModule.authenticate(
        credential.username,
        credential.password
      );
      const decoded = jwtDecode(client.access_token);
      const username = decoded.sub;
      const role = decoded.role.slice(1, -1);
      */

      const auth = await apiModule.getAuth(credential.username);
      const role = auth.role;
      if (role === "APPLICANT") {
        getApplicantData(auth);
      } else if (role === "RECRUITER") {
        getRecruiterData(auth);
      }

      setLoggedIn(true);
      if (role === "APPLICANT") {
        navigate("/user/dashboard", { replace: true });
      } else if (role === "RECRUITER") {
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
