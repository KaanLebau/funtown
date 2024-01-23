import HeadView from '../../views/headView/HeadView'
import React, { useEffect } from 'react'

const HeadPresenter = () => {
    var user = {name :"kaan"}
    function logout(){
        console.log("logout")
        user = null
    }
    

  return (
    <div>
        <HeadView user ={user} logout={logout}/>
    </div>
  )
    
}

export default HeadPresenter