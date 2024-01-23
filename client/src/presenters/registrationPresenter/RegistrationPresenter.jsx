import React from 'react'
import RegistrationView from '../../views/registrationView/RegistrationView'

function RegistrationPresenter() {
    function submit(user){
        console.log("submit")
        console.log(user)
    }
  return (
    <div><RegistrationView onSubmit ={submit}/></div>
  )
}

export default RegistrationPresenter