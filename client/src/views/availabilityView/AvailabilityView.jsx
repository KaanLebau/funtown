import React from "react";

function AvailabilityView(props) {
  return (
    <div data-testId="availability-view" className="availabilityView">
      {props.availList.length === 0 ? (
        <p className="no-avail">No Availability</p>
      ) : (
        <div>
          some list
          <div>{console.log(props.availList.length)}</div>
        </div>
      )}
    </div>
  );
}

export default AvailabilityView;
