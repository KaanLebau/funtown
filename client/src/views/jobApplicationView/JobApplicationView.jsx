import React from "react";
import "./jobApplicationView.scss";

/**
 * JobApplicationView component for displaying job application form.
 *
 * @component
 * @example
 * // Usage:
 * import JobApplicationView from './path/to/JobApplicationView';
 *
 * // Example usage in a parent component:
 * <JobApplicationView
 *   position={['Position 1', 'Position 2', 'Position 3']}
 *   experience={['Experience 1', 'Experience 2', 'Experience 3']}
 *   apply={() => console.log('Job application submitted')}
 *   cancel={() => console.log('Job application canceled')}
 * />
 *
 * @param {Object} props - The props of the component.
 * @param {Array} props.position - The list of available positions.
 * @param {Array} props.experience - The list of available experiences.
 * @param {Function} props.apply - Function to handle job application submission.
 * @param {Function} props.cancel - Function to handle job application cancellation.
 * @returns {JSX.Element} The rendered JobApplicationView component.
 * @author Kaan
 */

function JobApplicationView(props) {
  return (
    <div data-testid="job-application-view" className="application-content">
      <label id="position" htmlFor="position">
        Position:{" "}
      </label>
      <select title="Positions">
        <option value="option1">Position </option>
        {props.position.map((item, index) => (
          <option key={index} value={item}>
            {item}
          </option>
        ))}
      </select>
      <label id="experience" htmlFor="experience">
        Experience:{" "}
      </label>
      <select title="Experiences">
        <option value="option1">Experience </option>
        {props.experience.map((item, index) => (
          <option key={index} value={item}>
            {item}
          </option>
        ))}
      </select>
      <label id="from" htmlFor="fromDate">
        {" "}
        From:{" "}
      </label>
      <input id="fromDate" title="Start date" type="date" />
      <label id="to" htmlFor="toDate">
        {" "}
        To:{" "}
      </label>
      <input id="toDate" title="End date" type="date" />

      <button id="submit" title="Apply" type="button" onClick={props.apply}>
        Apply
      </button>
      <button id="cancel" title="Cancel" type="button" onClick={props.cancel}>
        Cancel
      </button>
    </div>
  );
}

export default JobApplicationView;
