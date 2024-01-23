import React, { useEffect, useState } from 'react'
import HeadPresenter from '../../presenters/headPresenter/HeadPresenter'
import { useNavigate } from "react-router-dom";
import { HiLogin} from "react-icons/hi";
import { FaWpforms } from "react-icons/fa6";
import "./welcomePage.scss"

/**
 * This function represents the WelcomePage component, which displays the welcome page content and handles navigation.
 * navigation options are @component{LoginPage} or @class{RegistrationPage}.
 * 
 *
 * @return {JSX.Element} The JSX for the WelcomePage component
 */
function WelcomePage() {

  const[direction, setDirection] = useState("")
  const navigate = useNavigate();

useEffect(()=>{
  console.log(direction)
  navigate(`./${direction}`);
},[direction])


  return (
    <div className='content'>
        <div className="head">

                <HeadPresenter/>
        </div> 
        <div className="welcome-content">
           <div className='selection' title='Login' onClick={()=>setDirection("login")}>
              <HiLogin className='icon'/>
              Login
            </div>
           <div className='selection' title='Register' onClick={()=> setDirection("registration")}>
           <FaWpforms className='icon'/>
           Register
           </div>
        </div>
    </div>
  )
}

export default WelcomePage