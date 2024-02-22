import JobTableView from "../../views/jobTableView/JobTableView";
import { useEffect, useState } from "react";
import "./jobTablePresenter.scss";
import { languageSelector } from "../../model/languageModel";
import { useRecoilValue } from "recoil";
function JobTablePresenter(props) {
  const language = useRecoilValue(languageSelector);
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);

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
    if (props.user.role === "APPLICANT") {
      setRows(props.user.availability);
      setColumns(getColumns());
    } else {
      //TODO big api call
    }
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
  function getColumns() {
    const availability = props.user.availability;
    let columnList = [];
    if (Array.isArray(availability)) {
      // Check if availability is an array
      if (availability.length > 0) {
        // Iterate over the first object to extract keys
        Object.keys(availability[0]).forEach((key) => {
          columnList.push({
            field: key,
            headerName: getColumnHeader(key),
            type: typeof availability[0][key],
            width: getWidth(key),
          });
        });
      }
    }
    return columnList;
  }
  //<JobTableView role={props.user.role} data={data} />

  useEffect(() => {
    dataSelection();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.user, props.user.availability, language]);
  return <JobTableView role={props.user.role} rows={rows} columns={columns} />;
}

export default JobTablePresenter;
