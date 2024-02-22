class OverlappingDatesError extends Error {
  constructor(code, message) {
    super(message);
    this.name = this.constructor.name;
    this.code = code;
    Error.captureStackTrace(this, this.constructor);
  }
}

const availabilityModel = {
  dates: [],

  init: function (currentList) {
    this.dates = currentList;
  },

  _checkOverlap: function (newFromDate, newToDate) {
    for (let i = 0; i < this.dates.length; i++) {
      const date = this.dates[i];
      const fromDate = new Date(date.from);
      const toDate = new Date(date.to);

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

  add: function (availability) {
    let errCode = 0;

    if (!this._isValidDate(availability.from)) {
      errCode += 1;
    }
    if (!this._isValidDate(availability.to)) {
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
    const newFromDate = new Date(availability.from);
    const newToDate = new Date(availability.to);
    const { overlap } = this._checkOverlap(newFromDate, newToDate);
    if (!overlap) {
      this.dates = [...this.dates, availability];
    } else {
      // eslint-disable-next-line no-throw-literal
      throw new OverlappingDatesError(4, "overlaping dates");
    }
  },

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

  show: function () {
    console.log("Availability Dates:");
    this.dates.forEach((date, index) => {
      console.log(`[${index}] From: ${date.from}, To: ${date.to}`);
    });
  },
};

export default availabilityModel;
