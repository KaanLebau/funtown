import React from "react";
import HeadPresenter from "../../presenters/headPresenter/HeadPresenter";
import LoginPresenter from "../../presenters/loginPresenter/LoginPresenter";
/**
 *
 * The `LoginPage` component serves as a container for rendering essential components in the browser related to the login functionality.
 * It acts as the main entry point for assembling and displaying the necessary components on the login page.
 *
 * @component
 * @example
 * // Usage of LoginPage in a higher-level component or route:
 * import LoginPage from './pages/loginPage/LoginPage';
 * <LoginPage />
 * // ... other imports
 * @returns
 */
function LoginPage() {
  return (
    <div data-testid="login-page" className="content">
      <div className="head">
        <HeadPresenter />
      </div>
      <div className="form">
        <LoginPresenter />
      </div>
    </div>
  );
}

export default LoginPage;
