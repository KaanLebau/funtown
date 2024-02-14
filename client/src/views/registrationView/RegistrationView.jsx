import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./registrationView.scss";
import { languageSelector } from "../../model/languageModel";
import { useRecoilValue } from "recoil";
/**
 * Renders the registration view for user registration.
 * This component provides a registration form for users to input their information,
 * including first name, last name, username, email, personal number (pnr), and password.
 * Utilizes Formik library for form validation.
 * Does not contain business logic and focuses solely on rendering the form elements.
 *
 * @component
 * @param {object} props - The props object for sending data to the presenter.
 * @param {Function} props.onSubmit - The function to handle form submission.
 * @return {JSX.Element} The registration view component.
 */
function RegistrationView(props) {
  const language = useRecoilValue(languageSelector);
  const inititalValues = {
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    pnr: "",
    password: "",
  };
  const validationSchema = Yup.object({
    firstName: Yup.string()
      .min(2, language.firstnameConstrain)
      .required(language.firstnameReq),
    lastName: Yup.string()
      .min(2, language.lastnameConstrain)
      .required(language.lastnameReq),
    username: Yup.string()
      .min(5, language.usernameContrain)
      .required(language.usernameReq),
    email: Yup.string()
      .email(language.emailConstrain)
      .required(language.emailReq),
    pnr: Yup.string()
      .matches(
        /^(19|20)\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])-\d{4}$/,
        language.pnrConstrain
      )
      .required(language.pnrReq),
    password: Yup.string()
      .min(8, language.passwordConstrain)
      .required(language.passwordReq),
  });
  const handleSubmit = (values, { setSubmitting }) => {
    // Call the onSubmit function from the presenter with the form values
    props.onSubmit(values);
    setSubmitting(false);
  };

  return (
    <div data-testid="registration-view" className="RegistrationView">
      <Formik
        initialValues={inititalValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className="registration-form">
          <div className="form-content">
            <div className="row">
              <label htmlFor="firstName">{language.firstname}:</label>
              <Field
                type="text"
                id="firstName"
                name="firstName"
                placeholder="John"
                title={language.firstname}
              />
              <ErrorMessage
                data-testid="firstNameErr"
                name="firstName"
                component="div"
                className="error-message"
              />
            </div>

            <div className="row">
              <label htmlFor="lastName">{language.lastname}:</label>
              <Field
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Doe"
                title={language.lastname}
              />
              <ErrorMessage
                data-testid="lastNameErr"
                name="lastName"
                component="div"
                className="error-message"
              />
            </div>

            <div className="row">
              <label htmlFor="username">{language.username}:</label>
              <Field
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
              <label htmlFor="email">{language.email}:</label>
              <Field
                type="email"
                id="email"
                name="email"
                placeholder="jhonny@doe.com"
                title={language.email}
              />
              <ErrorMessage
                data-testid="emailErr"
                name="email"
                component="div"
                className="error-message"
              />
            </div>

            <div className="row">
              <label htmlFor="pnr">{language.pnr}:</label>
              <Field
                type="text"
                id="pnr"
                name="pnr"
                placeholder="YYYYMMDD-NNNN"
                title={language.pnr}
              />
              <ErrorMessage
                data-testid="pnrErr"
                name="pnr"
                component="div"
                className="error-message"
              />
            </div>

            <div className="row">
              <label htmlFor="password">{language.password}:</label>
              <Field
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

            <button type="submit" title={language.submit}>
              {language.submit}
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
}

export default RegistrationView;
