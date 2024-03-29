import React, { useEffect } from "react";
import AvailabilityView from "../../views/availabilityView/AvailabilityView";
import availabilityModel from "../../model/availabilityModel";
import { useState } from "react";
import { languageSelector } from "../../model/languageModel";
import { useRecoilValue } from "recoil";
import { currentUserState } from "../../model/userModel";

/**
 * Availability Presenter component.
 *
 * This component manages the presentation logic for availability data. It handles adding and removing availability slots,
 * validating input dates, and updating the availability list. It renders the AvailabilityView component to display the
 * availability data and handle user interactions.
 *
 * @component
 * @param {Object} props - The properties passed to the component.
 * @param {Function} props.updateList - A function to update the availability list.
 * @returns {JSX.Element} The rendered Availability Presenter.
 * @author Kaan
 *
 * @example
 * // Import AvailabilityPresenter component
 * import AvailabilityPresenter from "/path-to-presenter"
 * // Inside a React functional component
 * const handleUpdateList = (list) => {
 *   console.log("Updated list:", list);
 * };
 *
 * return (
 *   <AvailabilityPresenter updateList={handleUpdateList} />
 * )
 */
function AvailabilityPresenter(props) {
  const user = useRecoilValue(currentUserState);
  const language = useRecoilValue(languageSelector);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [error, setError] = useState({ code: null, state: false, msg: "" });
  const [availList, setAvailList] = useState([]);
  const [errMsg] = useState("");

  function handleDates(input) {
    setError({ state: false, msg: "" });
    switch (input.id) {
      case "from":
        setFromDate(input.value.split("T")[0]);
        break;
      case "to":
        setToDate(input.value.split("T")[0]);
        break;
      default:
        break;
    }
  }
  function updateAvailabilityList() {
    props.updateList(availList);
  }
  function handleRemove(indexToRemove) {
    let removedList = availList.filter((_, index) => index !== indexToRemove);
    setAvailList(removedList);
  }
  function handleAdd() {
    try {
      const newItem = {
        username: user.username,
        fromDate: fromDate,
        toDate: toDate,
        status: "UNHANDLED",
        position: "",
        contact: "",
      };
      availabilityModel.add(newItem);
      setAvailList((prevList) => {
        const updatedList = [...prevList, newItem];
        return updatedList;
      });
      updateAvailabilityList();
    } catch (error) {
      switch (error.code) {
        case 1:
          setError({
            code: error.code,
            state: true,
            msg: language.missingFrom,
          });
          break;
        case 2:
          setError({ code: error.code, state: true, msg: language.missingTo });
          break;
        case 3:
          setError({
            code: error.code,
            state: true,
            msg: language.missingDate,
          });
          break;
        case 4:
          setError({
            code: error.code,
            state: true,
            msg: language.dateOverlap,
          });
          break;
        default:
          break;
      }
    }
  }
  useEffect(() => {
    availabilityModel.init(user.availability);
  }, []);

  useEffect(() => {
    function updateErrMsg() {
      switch (error.code) {
        case 1:
          setError({
            code: error.code,
            state: true,
            msg: language.missingFrom,
          });
          break;
        case 2:
          setError({ code: error.code, state: true, msg: language.missingTo });
          break;
        case 3:
          setError({
            code: error.code,
            state: true,
            msg: language.missingDate,
          });
          break;
        case 4:
          setError({
            code: error.code,
            state: true,
            msg: language.dateOverlap,
          });
          break;
        default:
          break;
      }
    }

    if (error.state === true) {
      updateErrMsg();
    }
    props.updateList(availList);
  }, [language, errMsg, error.state, availList, fromDate, toDate]);
  return (
    <AvailabilityView
      availabilityList={availList}
      handleDates={handleDates}
      err={error}
      add={handleAdd}
      remove={handleRemove}
    />
  );
}

export default AvailabilityPresenter;
