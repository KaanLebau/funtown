import "./availabilityView.scss";
import { languageSelector } from "../../model/languageModel";
import { useRecoilValue } from "recoil";
import { IoIosRemoveCircle } from "react-icons/io";

/**
 * Availability View component.
 *
 * This component displays availability information, allowing users to view, add, and remove their availability periods.
 *  It also handles date selection and error messages related to availability.
 *
 * @component
 * @param {Object} props - The props of the component.
 * @param {Array} props.availabilityList - The list of availability periods.
 * @param {Function} props.handleDates - The function to handle date selection.
 * @param {Function} props.add - The function to add a new availability period.
 * @param {Object} props.err - The error object containing error state and message.
 * @param {Function} props.remove - The function to remove an availability period.
 * @returns {JSX.Element} The rendered Availability View.
 * @author Kaan
 *
 * @example
 * // Import AvailabilityView component
 * import AvailabilityView from "./path/to/AvailabilityView";
 *
 * // Inside a React functional component
 * return (
 *   <AvailabilityView
 *     availabilityList={availabilityData}
 *     handleDates={handleDateSelection}
 *     add={handleAddAvailability}
 *     err={error}
 *     remove={handleRemoveAvailability}
 *   />
 * )
 */
function AvailabilityView(props) {
  const language = useRecoilValue(languageSelector);
  return (
    <div data-testid="availability-view" className="availability-wiew">
      <p
        data-testid="availability-view-titel"
        className="availability-view-titel"
      >
        {language.availabilityTitle}
      </p>
      {props.availabilityList.length === 0 ? (
        <p data-testid="availability-view-no-data" className="no-avail">
          {language.noAvailability}
        </p>
      ) : (
        <div data-testid="availability-list" className="availability-list">
          {props.availabilityList.map((item, index) => (
            <div className="availability-list-row" key={index}>
              <div
                data-testid="availability-list-element"
                className="availability-list-element"
              >
                {item.fromDate} - {item.toDate}
              </div>
              <div
                data-testid="availability-list-element-icon-conteiner"
                className="availability-list-element-icon-conteiner"
              >
                <IoIosRemoveCircle
                  data-testid="availability-list-element-icon"
                  className="availability-list-element-icon"
                  key={item.id}
                  onClick={() => props.remove(index)}
                  title={language.remove}
                />
              </div>
            </div>
          ))}
        </div>
      )}
      <div
        data-testid="availability-controller"
        className="availability-controller"
      >
        <input
          onChange={(e) => {
            props.handleDates({ id: e.target.id, value: e.target.value });
          }}
          data-testid="availability-from-selector"
          className="date-selector"
          type="date"
          name="from"
          id="from"
        />
        <input
          onChange={(e) => {
            props.handleDates({ id: e.target.id, value: e.target.value });
          }}
          data-testid="availability-to-selector"
          className="date-selector"
          type="date"
          name="to"
          id="to"
        />
        <button onClick={props.add}>{language.add}</button>
        {props.err.state && (
          <div
            data-testid="availability-error-container"
            className="error-container"
          >
            <p data-testid="availability-error-msg" className="error">
              {props.err.msg}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default AvailabilityView;
