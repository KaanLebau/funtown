import React from "react";
import AvailabilityView from "../../views/availabilityView/AvailabilityView";
import { useState } from "react";

function AvailabilityPresenter(props) {
  const date1 = { from: "2024-02-10", to: "2024-02-15" };
  const date2 = { from: "2024-03-10", to: "2024-03-15" };

  const [availList, setAvailList] = useState([date1]);
  const [editStates, setEditStates] = useState(
    Array(availList.length).fill(false)
  );
  console.log(availList);
  return <AvailabilityView availabilityList={availList} />;
}

export default AvailabilityPresenter;
