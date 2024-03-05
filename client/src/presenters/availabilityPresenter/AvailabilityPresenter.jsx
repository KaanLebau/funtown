import React, { useEffect } from "react";
import AvailabilityView from "../../views/availabilityView/AvailabilityView";
import availabilityModel from "../../model/availabilityModel";
import { useState } from "react";
import { languageSelector } from "../../model/languageModel";
import { useRecoilValue } from "recoil";
import { currentUserState } from "../../model/userModel";

function AvailabilityPresenter(props) {
  const user = useRecoilValue(currentUserState);
  const language = useRecoilValue(languageSelector);

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [error, setError] = useState({ state: false, msg: "" });
  const [availList, setAvailList] = useState([]);
  const [errMsg] = useState("");

  function handleDates(input) {
    setError({ state: false, msg: "" });
    switch (input.id) {
      case "from":
        setFromDate(input.value);
        break;
      case "to":
        setToDate(input.value);
        break;
      default:
        break;
    }
  }
  function handleRemove(indexToRemove) {
    console.log(indexToRemove);
  }
  function handleAdd() {
    try {
      availabilityModel.add({
        from: fromDate,
        to: toDate,
        status: "unhandled",
        position: "",
        contact: "",
      });
      setAvailList([
        ...availList,
        {
          from: fromDate,
          to: toDate,
          status: "unhandled",
          position: "",
          contact: "",
        },
      ]);
      console.log(availList);
      console.log(availabilityModel.dates);
    } catch (error) {
      switch (error.code) {
        case 1:
          setError({ state: true, msg: language.missingFrom });
          break;
        case 2:
          setError({ state: true, msg: language.missingTo });
          break;
        case 3:
          setError({ state: true, msg: language.missingDate });
          break;
        case 4:
          setError({ state: true, msg: language.dateOverlap });
          break;
        default:
          break;
      }
    }
  }
  useEffect(() => {
    if (availabilityModel.dates.length === 0) {
      availabilityModel.init(user.availability);
    }
    if (error.state === true) {
      setError({ state: true, msg: errMsg });
    }
  }, [language, errMsg, error.state, user.availability]);
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
