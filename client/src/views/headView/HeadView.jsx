import "./headView.scss"

import { HiLogout} from "react-icons/hi";
import React from 'react'

/**
 * Renders the head view for the user.
 * This component is responsible for rendering the header of the application,
 * including the site title and, if a user is present, a logout button.
 *
 * @component
 * @param {object} props - The props object containing user information.
 * @param {object} props.user - The user object, indicating if a user is logged in.
 * @param {function} props.logout - The function to be called when the logout button is clicked.
 * @returns {JSX.Element} The rendered head view component.
 */
const HeadView = (props) => {
    const { user } = props


  return (
  <div data-testid="head-view" className='content'>
    <h1 title="Homepage">Funtown</h1>
    <div className="control">
        {user && (
            <>
            <HiLogout className="icon"title="logout" onClick={props.logout}/>
            </>
        )}
        

    </div>

  </div>
  )
}

export default HeadView