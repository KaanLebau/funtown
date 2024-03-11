/**
 * Custom Error class for handling errors related to overlapping dates in availability periods.
 * This error is thrown when there is an attempt to add a new availability period that overlaps with existing periods.
 * It contains a code to identify the type of error and a message to provide additional information.
 *
 * @class OverlappingDatesError
 * @extends Error
 *
 * @param {number} code - The error code to identify the type of error.
 * @param {string} message - A descriptive message providing additional information about the error.
 */
class OverlappingDatesError extends Error {
  /**
   * Creates an instance of OverlappingDatesError.
   * @param {number} code - The error code to identify the type of error.
   * @param {string} message - A descriptive message providing additional information about the error.
   */
  constructor(code, message) {
    super(message);
    this.name = this.constructor.name;
    this.code = code;
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Availability Model for managing a list of date ranges representing availability periods, created by Kaan.
 * This model ensures that there are no overlapping dates within the list and provides functions
 * for adding, updating, removing, and displaying availability periods.
 *
 * @author Kaan
 *
 * @example
 * // Import the availability model
 * import availabilityModel from './availabilityModel';
 *
 * // Initialize with initial availability periods
 * availabilityModel.init([{ fromDate: '2024-03-01', toDate: '2024-03-05' }]);
 *
 * // Add a new availability period
 * availabilityModel.add({ fromDate: '2024-03-10', toDate: '2024-03-15' });
 *
 * // Update an existing availability period
 * availabilityModel.update(0, { fromDate: '2024-03-06', toDate: '2024-03-08' });
 *
 * // Remove an availability period
 * availabilityModel.remove(0);
 *
 * // Display all availability periods
 * availabilityModel.show();
 */
const availabilityModel = {
  dates: [],
  /**
   * Initializes the availability model with a provided list of availability periods.
   * @param {Array} currentList - An array of availability periods.
   */
  init: function (currentList) {
    this.dates = currentList;
  },

  _checkOverlap: function (newFromDate, newToDate) {
    for (let i = 0; i < this.dates.length; i++) {
      const date = this.dates[i];
      const fromDate = new Date(date.fromDate);
      const toDate = new Date(date.toDate);

      // Check if new period starts within existing period
      if (newFromDate >= fromDate && newFromDate <= toDate) {
        return { overlap: true };
      }

      // Check if new period ends within existing period
      if (newToDate >= fromDate && newToDate <= toDate) {
        return { overlap: true };
      }

      // Check if new period encapsulates existing period
      if (newFromDate <= fromDate && newToDate >= toDate) {
        return { overlap: true };
      }

      // Check if new period entirely overlaps existing period
      if (newFromDate < fromDate && newToDate > toDate) {
        return { overlap: true };
      }
    }

    return { overlap: false };
  },

  _isValidDate: function (dateString) {
    const regex =
      /^(?:19|20)\d{2}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1\d|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)$/;
    return regex.test(dateString);
  },
  /**
   * Adds a new availability period to the model.
   * @param {Object} availability - An object representing the new availability period with `fromDate` and `toDate` properties.
   * @throws {OverlappingDatesError} Throws an error if the new availability period overlaps with existing periods or if the dates are invalid.
   */
  add: function (availability) {
    let errCode = 0;

    if (!this._isValidDate(availability.fromDate)) {
      errCode += 1;
    }
    if (!this._isValidDate(availability.toDate)) {
      errCode += 2;
    }

    switch (errCode) {
      case 1:
        // eslint-disable-next-line no-throw-literal
        throw new OverlappingDatesError(1, "from is not a date");
      case 2:
        // eslint-disable-next-line no-throw-literal
        throw new OverlappingDatesError(2, "to is not a date");
      case 3:
        // eslint-disable-next-line no-throw-literal
        throw new OverlappingDatesError(3, "no date provided");
      default:
        break;
    }
    const newFromDate = new Date(availability.fromDate);
    const newToDate = new Date(availability.toDate);
    const { overlap } = this._checkOverlap(newFromDate, newToDate);
    if (!overlap) {
      this.dates = [...this.dates, availability];
    } else {
      // eslint-disable-next-line no-throw-literal
      throw new OverlappingDatesError(4, "overlaping dates");
    }
  },
  /**
   * Updates an existing availability period.
   * @param {number|Object} arg1 - If it's a number, it represents the index of the availability period to update.
   * If it's an object, it represents the availability period to search for.
   * @param {Object} newDate - The new availability period to replace the existing one.
   * @throws {Error} Throws an error if the index is out of range or if the date to update is not found.
   */
  update: function (arg1, newDate) {
    if (typeof arg1 === "number") {
      const index = arg1;
      if (this._indexCheck(index)) {
        this.dates[index] = newDate;
      } else {
        throw new Error("Index out of range");
      }
    } else {
      const index = this._getIndex(arg1);
      if (this._indexCheck(index)) {
        this.dates[index] = newDate;
      } else {
        throw new Error("Date is not found");
      }
    }
  },

  _indexCheck(index) {
    if (index >= 0 && index < this.dates.length) {
      return true;
    } else {
      return false;
    }
  },

  _getIndex: function (searchDate) {
    return this.dates.findIndex((d) => d === searchDate);
  },

  /**
   * Removes an availability period from the model.
   * @param {number|Object} arg - If it's a number, it represents the index of the availability period to remove.
   * If it's an object, it represents the availability period to search for.
   * @throws {Error} Throws an error if the index is out of range or if the date to remove is not found.
   */
  remove: function (arg) {
    if (typeof arg === "number") {
      const index = arg;
      if (this._indexCheck(index)) {
        this.dates.splice(index, 1);
      } else {
        throw new Error("Index out of range");
      }
    } else {
      const index = this._getIndex(arg);
      if (this._indexCheck(index)) {
        this.dates.splice(index, 1);
      } else {
        throw new Error("Date is not found");
      }
    }
  },

  /**
   * Displays all availability periods in the model.
   */
  show: function () {
    console.log("Availability Dates:");
    this.dates.forEach((date, index) => {
      console.log(`[${index}] From: ${date.fromDate}, To: ${date.to}`);
    });
  },
};

export default availabilityModel;
