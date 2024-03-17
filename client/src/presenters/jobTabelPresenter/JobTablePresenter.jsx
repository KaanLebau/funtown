import JobTableView from "../../views/jobTableView/JobTableView";
import { useEffect, useState } from "react";
import "./jobTablePresenter.scss";
import { languageSelector } from "../../model/languageModel";
import { currentUserState } from "../../model/userModel";
import { useRecoilValue } from "recoil";
/**
 * Job Table Presenter component.
 *
 * This component manages the presentation logic for displaying job application data in a table format. It dynamically
 * generates columns based on the provided data and renders the JobTableView component to display the table.
 *
 * @component
 * @returns {JSX.Element} The rendered Job Table Presenter.
 * @author Kaan
 *
 * @example
 * // Import JobTablePresenter component
 * import JobTablePresenter from "/path-to-presenter";
 *
 * // Inside a React functional component
 * return (
 *   <JobTablePresenter role="APPLICANT" data={applicationData} selectedApplication={handleApplicaionDetail} />
 * )
 */
function JobTablePresenter(props) {
  const language = useRecoilValue(languageSelector);
  //const user = useRecoilValue(currentUserState);
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);
  let preparedData;

  function getColumnHeader(header) {
    switch (header) {
      case "from":
        return language.from;
      case "to":
        return language.to;
      case "position":
        return language.position;
      case "status":
        return language.status;
      case "contact":
        return language.contact;
      default:
        break;
    }
  }
  function dataSelection() {
    if (props.role === "APPLICANT") {
      preparedData = props.data;
      setRows(preparedData);
      setColumns(getColumns(preparedData));
    } else {
      preparedData = cleanupData();
      setRows(preparedData);
      setColumns(getColumns(preparedData));
    }
  }

  function selectedApplicant(id) {
    props.selectedApplication(id);
  }

  function cleanupData() {
    let cleanData = [];
    props.data.map((item) => {
      cleanData.push({
        id: item.id,
        fullName: item.fullname,
        status: item.status,
      });
    });
    return cleanData;
  }
  function getWidth(column) {
    switch (column) {
      case "id":
        return 50;
      case "from":
        return 130;
      case "to":
        return 130;
      case "status":
        return 130;
      case "position":
        return 150;
      case "contact":
        return 100;
      default:
        break;
    }
  }
  function getColumns(appllication) {
    let columnList = [];
    if (Array.isArray(appllication)) {
      // Check if availability is an array
      if (appllication.length > 0) {
        // Iterate over the first object to extract keys
        Object.keys(appllication[0]).forEach((key) => {
          columnList.push({
            field: key,
            headerName: getColumnHeader(key),
            type: typeof appllication[0][key],
            width: getWidth(key),
          });
        });
      }
    }
    return columnList;
  }

  useEffect(() => {
    dataSelection();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);
  return (
    <JobTableView
      role={props.role}
      rows={rows}
      columns={columns}
      selectedApplication={selectedApplicant}
    />
  );
}

export default JobTablePresenter;
