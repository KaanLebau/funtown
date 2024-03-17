import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./registrationView.scss";
import { languageSelector } from "../../model/languageModel";
import { useRecoilValue } from "recoil";
/**
 * RegistrationView component for rendering user registration form.
 *
 * @component
 * @example
 * // Usage:
 * import RegistrationView from './path/to/RegistrationView';
 *
 * // Example usage in a parent component:
 * <RegistrationView
 *   onSubmit={(values) => console.log("Form submitted with values:", values)}
 * />
 *
 * @param {Object} props - The props of the component.
 * @param {Function} props.onSubmit - Function to handle form submission with form values.
 * @returns {JSX.Element} The rendered RegistrationView component.
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
                data-testid="registration-form-view-firstname"
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
                data-testid="registration-form-view-lastname"
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
                data-testid="registration-form-view-username"
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
                data-testid="registration-form-view-email"
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
                data-testid="registration-form-view-pnr"
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
                data-testid="registration-form-view-password"
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
              data-testid="registration-form-view-submit-button"
              type="submit"
              title={language.submit}
            >
              {language.submit}
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
}

export default RegistrationView;
