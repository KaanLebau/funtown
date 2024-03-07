import React from "react";
import RegistrationPresenter from "../../presenters/registrationPresenter/RegistrationPresenter";
import "./registrationPage.scss";

/**
 *
 * The `RegistrationPage` component serves as a container for rendering essential components in the browser related to the user registration functionality.
 * It acts as the main entry point for assembling and displaying the necessary components on the registration page.
 *
 * @component
 * @example
 * // Usage of RegistrationPage in a higher-level component or route:
 * import RegistrationPage from './pages/registerPage/RegistrationPage';
 * <RegistrationPage />
 * // ... other imports
 * @returns {JSX.Element}
 */
function RegistrationPage() {
  return (
    <div data-testid="registration-page" className="content">
      <div data-testid="registration-page-presenter-wrapper" className="form">
        <RegistrationPresenter />
      </div>
    </div>
  );
}

export default RegistrationPage;
