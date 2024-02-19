import React from "react";
import TableWiew from "../../views/tableView/TableWiew";
import { FaCheckCircle } from "react-icons/fa";
import { FaRegCircleXmark } from "react-icons/fa6";
import { FaCirclePause } from "react-icons/fa6";
import { useRecoilValue } from "recoil";
import { currentUserState } from "../../model/userModel";

/**
 * Presenter component for rendering a table with specific data, including status icons.
 *
 * @component
 * @example
 * // Usage in another component
 * import TabelPresenter from './path/to/TabelPresenter';
 * // ...
 * <TabelPresenter />
 *
 * @returns {JSX.Element} The rendered TabelPresenter component
 */
function TabelPresenter(props) {
  const user = useRecoilValue(currentUserState);

  function handleApplicant(id) {
    props.applicant(id);
  }

  function getHeaders(elements) {
    if (elements) {
      if (elements.length === 0) {
        console.error("No rows provided.");
        return [];
      }

      if (user.role === "recruiter") {
        return ["fullName", "status", "handle"];
      }

      const firstRow = elements[0];
      const keys = Object.keys(firstRow);

      return keys;
    } else {
      return [];
    }
  }
  return (
    <div data-testid="table-presenter">
      <TableWiew
        columns={getHeaders(props.allApplicants)}
        rows={props.allApplicants}
        applicant={handleApplicant}
      />
    </div>
  );
}

export default TabelPresenter;
