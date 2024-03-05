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

      if (
        (newToDate === fromDate && newToDate === toDate) || // New period starts within existing period
        (newToDate >= fromDate && newToDate <= toDate) || // New period ends within existing period
        (newFromDate <= fromDate && newToDate >= toDate) || // New period encapsulates existing period
        (newFromDate < fromDate && newToDate > toDate) // New period entirely overlaps existing period
      ) {
        return { overlap: true, date: date };
      }
    }

    return { overlap: false, from: null, to: null };
  },
  _isValidDate: function (dateString) {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
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
        throw { code: 1, msg: "from is not a date" };
      case 2:
        throw { code: 2, msg: "to is not a date" };
      case 3:
        throw { code: 3, msg: "Both from and to are not dates" };
      default:
        break;
    }
    const newFromDate = new Date(availability.from);
    const newToDate = new Date(availability.to);
    const { overlap, date: overlapingDate } = this._checkOverlap(
      newFromDate,
      newToDate
    );
    if (!overlap) {
      this.dates = [...this.dates, availability];
    } else {
      throw { code: 4, msg: "overlaping dates" };
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
