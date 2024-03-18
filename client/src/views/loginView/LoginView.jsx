import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./loginView.scss";
import { languageSelector } from "../../model/languageModel";
import { useRecoilValue } from "recoil";

/**
 * LoginView component for rendering login form.
 *
 * @component
 * @example
 * // Usage:
 * import LoginView from './path/to/LoginView';
 *
 * // Example usage in a parent component:
 * <LoginView
 *   loading={false}
 *   login={(values) => console.log('Logging in with:', values)}
 * />
 *
 * @param {Object} props - The props of the component.
 * @param {boolean} props.loading - Indicates if login operation is in progress.
 * @param {Function} props.login - Function to handle login submission.
 * @returns {JSX.Element} The rendered LoginView component.
 * @author Kaan
 */
function LoginView(props) {
  const language = useRecoilValue(languageSelector);
  const inititalValues = {
    username: "",
    password: "",
  };
  const validationSchema = Yup.object({
    username: Yup.string().required(language.usernameReq),
    password: Yup.string().required(language.passwordReq),
  });
  const handleSubmit = (values, { setSubmitting }) => {
    props.login(values);
    setSubmitting(false);
  };

  return (
    <div data-testid="login-view" className="LoginView">
      {props.loading ? (
        <p>{language.loading}</p>
      ) : (
        <Formik
          initialValues={inititalValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form className="registration-form">
            <div className="form-content">
              <div className="row">
                <label htmlFor="username">{language.username}:</label>
                <Field
                  data-testid="input-username"
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Rohnny"
                  title={language.username}
                />
                <ErrorMessage
                  data-testid="userNameErr"
                  name="username"
                  component="div"
                  className="error-message"
                />
              </div>

              <div className="row">
                <label htmlFor="password">{language.password}:</label>
                <Field
                  data-testid="input-password"
                  type="password"
                  id="password"
                  name="password"
                  placeholder="PassWord"
                  title={language.password}
                />
                <ErrorMessage
                  data-testid="passwordErr"
                  name="password"
                  component="div"
                  className="error-message"
                />
              </div>

              <button
                data-testid="button-submit"
                type="submit"
                title={language.submit}
              >
                {props.loading ? language.loading : language.submit}
              </button>
            </div>
          </Form>
        </Formik>
      )}
    </div>
  );
}

export default LoginView;
