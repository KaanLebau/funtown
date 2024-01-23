import React from 'react'
import HeadPresenter from '../../presenters/headPresenter/HeadPresenter'
import LoginPresenter from '../../presenters/loginPresenter/LoginPresenter'

function LoginPage() {
  return (
    <div className='content'>
        <div className="head">

                <HeadPresenter/>
        </div>
    
        <div className="form">
            <LoginPresenter />
        </div>
    </div>
  )
}

export default LoginPage