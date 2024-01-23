import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import "./loginView.scss"

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
    const inititalValues = {
        username:"",
        password: "",
    }
    const validationSchema = Yup.object({
        username: Yup.string().required('Username required!'),
        password: Yup.string().required('Password required'),
      });
      const handleSubmit = (values, { setSubmitting }) => {
        // Call the onSubmit function from the presenter with the form values
        props.onSubmit(values);
        setSubmitting(false);
      };
    
  return (
    <Formik initialValues={inititalValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
      <Form className='registration-form'>
        <div className="form-content">

        <div className='row'>
          <label htmlFor="username">Username:</label>
          <Field type="text" id="username" name="username" placeholder="Johnny"title="Username"/>
          <ErrorMessage name="username" component="div" className='error-message'/>
        </div>

        <div className='row'>
          <label htmlFor="password">Password:</label>
          <Field type="password" id="password" name="password" placeholder="PassWord"title="Password"/>
          <ErrorMessage name="password" component="div" className='error-message'/>
        </div>

        <button type="submit" title='Sumbit'>Submit</button>
        </div>
      </Form>
    </Formik>
  )
}

export default LoginView