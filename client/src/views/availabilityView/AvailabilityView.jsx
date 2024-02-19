import "./availabilityView.scss";

function AvailabilityView(props) {
  console.log(props);
  return (
    <div data-testId="availability-view" className="availability-wiew">
      <p className="availability-view-titel">Available times</p>
      {props.availabilityList.length === 0 ? (
        <p className="no-avail">No Availability</p>
      ) : (
        props.availabilityList.map((item, index) => (
          <div className="availability">
            <div className="icons-left">aleert icon</div>
            <div>
              {item.from} - {item.to}
            </div>
            <div className="icons-right">icnos</div>
          </div>
        ))
      )}
      <div className="controller">
        <input className="date-selector" type="date" name="from" id="from" />
        <input className="date-selector" type="date" name="to" id="to" />
        <button>add</button>
      </div>
    </div>
  );
}

export default AvailabilityView;
