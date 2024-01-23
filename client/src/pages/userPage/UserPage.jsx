import React from 'react'
import HeadPresenter from '../../presenters/headPresenter/HeadPresenter'
import JobApplicationPresenter from '../../presenters/jobApplicationPresenter/JobApplicationPresenter'



function UserPage() {
  return (
    <div className='content'>
    <div className="head">

            <HeadPresenter/>
    </div> 
    <div className="apply">
        <JobApplicationPresenter/>       
    </div>
    <div className='status'>

    </div>
</div>
  )
}

export default UserPage