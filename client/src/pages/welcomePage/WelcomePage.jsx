import React, { useEffect, useState } from "react";
import HeadPresenter from "../../presenters/headPresenter/HeadPresenter";
import { useNavigate } from "react-router-dom";
import { HiLogin } from "react-icons/hi";
import { FaWpforms } from "react-icons/fa6";
import "./welcomePage.scss";

/**
 * @module
 * This function represents the WelcomePage component, which displays the welcome page content and handles navigation.
 * navigation options are LoginPage or RegistrationPage.
 *
 *
 *
 * @example
 * // Usage of WelcomePage in a higher-level component or route:
 * import WelcomePage from './pages/welcomePage/WelcomePage';
 * <WelcomePage/>
 * // ... other imports
 * @return {JSX.Element} The JSX for the WelcomePage component
 */

function WelcomePage() {
  const [direction, setDirection] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    navigate(`./${direction}`);
  }, [direction]);

  return (
    <div data-testid="welcome-page" className="content">
      <div className="head">
        <HeadPresenter />
      </div>
      <div className="welcome-content">
        <div
          data-testid="to-login-page"
          className="selection"
          title="Login"
          onClick={() => setDirection("login")}
        >
          <HiLogin className="icon" title="To login" />
          Login
        </div>
        <div
          data-testid="to-registration-page"
          className="selection"
          title="Registration"
          onClick={() => setDirection("registration")}
        >
          <FaWpforms className="icon" title="To registration" />
          Register
        </div>
      </div>
    </div>
  );
}

export default WelcomePage;
