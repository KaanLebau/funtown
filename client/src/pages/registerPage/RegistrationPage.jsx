import React from 'react'
import HeadPresenter from '../../presenters/headPresenter/HeadPresenter'
import RegistrationPresenter from '../../presenters/registrationPresenter/RegistrationPresenter'
import "./registrationPage.scss"


function RegistrationPage() {
  return (
    <div className='content'>
        <div className="head">

                <HeadPresenter/>
        </div>
    
        <div className="form">
            <RegistrationPresenter/>
        </div>
    </div>
  )
}

export default RegistrationPage