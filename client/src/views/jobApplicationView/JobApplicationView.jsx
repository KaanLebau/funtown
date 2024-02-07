import React from 'react'
import './jobApplicationView.scss'
/**
 * Renders the job application form.
 * This component provides a form for users to submit job applications,
 * requiring them to select a position, specify experience, and choose available dates.
 * Users must select start and end dates in the 'From' and 'To' fields to define a date range.
 * It does not contain business logic and focuses solely on rendering the form elements.
 *
 * @component
 * @param {object} props - The props object containing data for rendering the form.
 * @param {string[]} props.position - The list of available positions for the user to choose from.
 * @param {string[]} props.experience - The list of available experience levels for the user to choose from.
 * @returns {JSX.Element} The rendered job application form.
 */
function JobApplicationView(props) {
  
  return (
    <div data-testid="job-application-view" className='application-content'>
        
        <label id="position" htmlFor="position">Position: </label>
        <select title='Positions'>
            <option value="option1">Position </option>
            {
                props.position.map((item, index) => 
                <option key={index} value={item}>{item}</option>)
            }
        </select>
        <label id="experience"   htmlFor="experience">Experience: </label>
        <select title="Experiences">
            <option value="option1">Experience </option>
            {
                props.experience.map((item, index) => 
                <option key={index} value={item}>{item}</option>)
            }
        </select>
            <label id="from" htmlFor="fromDate"> From: </label>
            <input id="fromDate" title="Start date"type="date"/>
            <label id="to" htmlFor="toDate"> To: </label>
            <input id="toDate" title="End date"type="date"/>
            
            <button id="submit" title="Apply" type='button' >Apply</button>
            <button id="cancel" title="Cancel" type='button' >Cancel</button>
        
        
    </div>
  )
}

export default JobApplicationView