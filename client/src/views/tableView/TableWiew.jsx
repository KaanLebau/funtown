import "./tableView.scss";
//import { FaCheckCircle, FaRegCircleXmark,FaCirclePause } from "react-icons/fa";
import { FaCirclePause, FaRegCircleXmark } from "react-icons/fa6";
import { FaEdit, FaCheckCircle } from "react-icons/fa";
import { GrDocumentMissing } from "react-icons/gr";

/*
  <div><FaCheckCircle title ="Accepted" className='accepted'/></div>
        <div><FaRegCircleXmark title ="Rejected" className='rejected'/></div>
        <div><FaCirclePause title ="Pending" className='unhandled'/></div>
*/
/**
 * View component for rendering a table using the Material-UI Data Grid.
 *
 * @component
 * @example
 * // Usage in another component
 * import TableWiew from './path/to/TableWiew';
 * // ...
 * <TableWiew rows={[]} columns={[]} />
 *
 * @param {Object} props - Component properties
 * @param {Array} props.rows - An array of objects representing the rows in the table
 * @param {Array} props.columns - An array of objects representing the columns in the table
 * @returns {JSX.Element} The rendered TableWiew component
 */
function TableWiew(props) {
  function handleGetId(row) {
    props.applicant(row);
  }

  function selectIcon(status) {
    if (status === "accepted") {
      return <FaCheckCircle title="Accepted" className="accepted" />;
    } else if (status === "rejected") {
      return <FaRegCircleXmark title="Rejected" className="rejected" />;
    } else if (status === "unhandled") {
      return <FaCirclePause title="Pending" className="unhandled" />;
    }
  }
  return (
    <div data-testid="table-view" className="table-content">
      <h2>All job applications</h2>
      {props.columns && props.columns.length > 0 ? (
        <table data-testid="tabel" className="the-table">
          <thead className="table-head">
            <tr>
              {props.columns.map((column) => (
                <th key={column} className="tabel-head">
                  {column.charAt(0).toUpperCase() + column.slice(1)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="table-body">
            {props.rows.map((row, rowIndex) => (
              <tr
                data-testid={`row-id-${row.id}`}
                key={rowIndex}
                className="table-row"
                onClick={() => handleGetId(row)}
              >
                {props.columns.map((column, colIndex) => (
                  <td title={column} key={colIndex}>
                    {column === "status" ? (
                      <div className={`status ${row[column]}`}>
                        {row[column]} {selectIcon(row[column])}
                      </div>
                    ) : column === "handle" ? (
                      <div className={`keys ${row[column]}`}>
                        {row[column]}{" "}
                        <FaEdit title="Handle" className="handle" />
                      </div>
                    ) : (
                      <div className={`keys ${row[column]}`}>{row[column]}</div>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="no-data">
          <GrDocumentMissing
            data-testid="no-data-icon"
            title="No data loaded"
            className="no-data-icon"
          />
          <label htmlFor="" className="no-data-label" title="No data loaded">
            No Data
          </label>
        </div>
      )}
    </div>
  );
}

export default TableWiew;
