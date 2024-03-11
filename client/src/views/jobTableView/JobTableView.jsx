import "./jobTableView.scss";
import { languageSelector } from "../../model/languageModel";
import { useRecoilValue } from "recoil";
import { GrDocumentMissing } from "react-icons/gr";
import { DataGrid } from "@mui/x-data-grid";
/**
 * JobTableView component for displaying job table.
 *
 * @component
 * @example
 * // Usage:
 * import JobTableView from './path/to/JobTableView';
 *
 * // Example usage in a parent component:
 * <JobTableView
 *   role="APPLICANT"
 *   rows={[
 *     { id: 1, position: 'Position 1', experience: 'Experience 1' },
 *     { id: 2, position: 'Position 2', experience: 'Experience 2' },
 *   ]}
 *   columns={[
 *     { field: 'position', headerName: 'Position', width: 150 },
 *     { field: 'experience', headerName: 'Experience', width: 150 },
 *   ]}
 *   selectedApplication={(id) => console.log(`Selected application ID: ${id}`)}
 * />
 *
 * @param {Object} props - The props of the component.
 * @param {string} props.role - The role of the user ('APPLICANT' or 'RECRUITER').
 * @param {Array} props.rows - The data rows to be displayed in the table.
 * @param {Array} props.columns - The columns configuration for the table.
 * @param {Function} props.selectedApplication - Function to handle selection of a job application.
 * @returns {JSX.Element} The rendered JobTableView component.
 * @author Kaan
 */
function JobTableView(props) {
  const language = useRecoilValue(languageSelector);

  const handleCellClick = (selection) => {
    props.selectedApplication(selection.row.id);
  };

  return (
    <div data-testid="job-table-view" className="job-table-view">
      {props.role === "APPLICANT" && (
        <div className="job-table-title-conteiner">
          <h2 data-testid="job-table-view-title">
            {language.appliedApplications}
          </h2>
        </div>
      )}
      <div className="job-table-view-table-container">
        {props.rows.length === 0 ? (
          <div className="job-table-empty">
            <GrDocumentMissing
              data-testid="job-table-view-no-data-icon"
              className="job-table-no-data-icon"
            />
            <p
              data-testid="job-table-view-no-data-msg"
              className="job-table-no-data"
            >
              {language.noAppliedApplication}
            </p>
          </div>
        ) : (
          <div className="custom-data-grid-outer">
            <DataGrid
              rows={props.rows}
              columns={props.columns}
              classes={{ root: "custom-data-grid" }}
              rowsPerPageOptions={[2]}
              style={{
                background: "transparent",
                backgroundColor: "#395b64",
                color: "#e7f6f2",
              }}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 5,
                  },
                },
              }}
              pageSizeOptions={[5]}
              disableColumnMenu
              onCellClick={handleCellClick}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default JobTableView;
