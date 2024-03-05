import "./jobTableView.scss";
import { languageSelector } from "../../model/languageModel";
import { useRecoilValue } from "recoil";
import { GrDocumentMissing } from "react-icons/gr";
import { DataGrid } from "@mui/x-data-grid";
function JobTableView(props) {
  const language = useRecoilValue(languageSelector);

  function getTitle() {
    if (props.role === "RECRUITER") {
      return language.applicationList;
    } else {
      return language.appliedApplications;
    }
  }

  return (
    <div data-testid="job-table-view" className="job-table-view">
      <div className="job-table-title-conteiner">
        <h2>{getTitle()}</h2>
      </div>
      <div className="job-table-view-table-container">
        {props.rows.length === 0 ? (
          <div className="job-table-empty">
            <GrDocumentMissing
              data-testid="job-table-view-no-data-icon"
              className="job-table-no-data-icon"
            />
            <p
              data-testid="job-table-view-no-data-icon"
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
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default JobTableView;
