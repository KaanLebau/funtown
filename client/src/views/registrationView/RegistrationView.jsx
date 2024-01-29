import React from 'react'
import {Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import "./registrationView.scss"
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
    const inititalValues = {
        firstName: "",
        lastName: "", 
        username:"",
        email: "",
        pnr: "",
        password: "",
    }
    const validationSchema = Yup.object({
        firstName: Yup.string().required('First name required!'),
        lastName: Yup.string().required('Last name required!'),
        username: Yup.string().required('Username required!'),
        email: Yup.string().email('Invalid email address!').required('Email required!'),
        pnr: Yup.string().required('Person number required!'),
        password: Yup.string().required('Password required!'),
      });
      const handleSubmit = (values, { setSubmitting }) => {
        // Call the onSubmit function from the presenter with the form values
        props.onSubmit(values);
        setSubmitting(false);
      };

  return (
    <div data-testid="registration-view" className="RegistrationView">

    <Formik initialValues={inititalValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
      <Form className='registration-form'>
        <div className="form-content">

      
        <div className='row'>
          <label htmlFor="firstName">First Name:</label>
          <Field type="text" id="firstName" name="firstName" placeholder="John"title="First name"/>
          <ErrorMessage data-testid="firstNameErr" name="firstName" component="div" className='error-message'/>
        </div>

        <div className='row'>
          <label htmlFor="lastName">Last Name:</label>
          <Field type="text" id="lastName" name="lastName" placeholder="Doe" title="Last name"/>
          <ErrorMessage data-testid="lastNameErr" name="lastName" component="div" className='error-message'/>
        </div>

        <div className='row'>
          <label htmlFor="username">Username:</label>
          <Field type="text" id="username" name="username" placeholder="Johnny"title="Username"/>
          <ErrorMessage data-testid="userNameErr" name="username" component="div" className='error-message'/>
        </div>

        <div className='row'>
          <label htmlFor="email">Email:</label>
          <Field type="email" id="email" name="email" placeholder="jhonny@doe.com" title="Email"/>
          <ErrorMessage data-testid="emailErr" name="email" component="div" className='error-message'/>
        </div>

        <div className='row'>
          <label htmlFor="pnr">Person nr:</label>
          <Field type="text" id="pnr" name="pnr" placeholder="YYYYMMDD-NNNN"title="Person number"/>
          <ErrorMessage data-testid="pnrErr"name="pnr" component="div" className='error-message'/>
        </div>

        <div className='row'>
          <label htmlFor="password">Password:</label>
          <Field type="password" id="password" name="password" placeholder="PassWord"title="Password"/>
          <ErrorMessage data-testid="passwordErr" name="password" component="div" className='error-message'/>
        </div>

        <button type="submit" title='Sumbit'>Submit</button>
        </div>
      </Form>
    </Formik>
    </div>
  )
}

export default RegistrationView