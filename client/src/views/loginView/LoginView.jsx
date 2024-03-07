import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./loginView.scss";
import { languageSelector } from "../../model/languageModel";
import { useRecoilValue } from "recoil";

/**
 * React component for the login view.
 * This component renders HTML elements for a login form using the Formik library for validation.
 * It does not contain business logic and focuses solely on rendering the form elements.
 *
 * @component
 * @param {Function} props.onSubmit - A function to handle form submission in the Presenter.
 * @return {JSX.Element} The rendered login view component.
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
                  placeholder="Johnny"
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
