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
        (newToDate >= fromDate && newToDate <= toDate) || // New period ends within existing period
        (newFromDate <= fromDate && newToDate >= toDate) || // New period encapsulates existing period
        (newFromDate < fromDate && newToDate > toDate) // New period entirely overlaps existing period
      ) {
        return { overlap: true, date: date };
      }
    }

    return { overlap: false, from: null, to: null };
  },
  add: function (availability) {
    const newFromDate = new Date(availability.from);
    const newToDate = new Date(availability.to);
    const { overlap, date: overlapingDate } = this._checkOverlap(
      newFromDate,
      newToDate
    );
    if (!overlap) {
      this.dates.push(availability);
    } else {
      throw new Error(
        `Overlap found between ${newFromDate.toISOString().split("T")[0]} and ${
          newToDate.toISOString().split("T")[0]
        } with ${overlapingDate.from} - ${overlapingDate.to}`
      );
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

// Example usage:
availabilityModel.add({ from: "2024-02-10", to: "2024-02-15" });
//availabilityModel.add("2024-02-20", "2024-02-25");
availabilityModel.show();

//availabilityModel.update(0, "2024-02-11", "2024-02-16");
//availabilityModel.show();

//availabilityModel.remove(1);
//availabilityModel.show();

const dates = [
  { from: "2024-01-10", to: "2024-01-15" },
  { from: "2024-03-10", to: "2024-03-15" },
];

availabilityModel.init(dates);
availabilityModel.show();
