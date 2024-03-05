import availabilityModel from "../../model/availabilityModel";
const date1 = { from: "2024-02-10", to: "2024-02-15" };
const date2 = { from: "2024-03-10", to: "2024-03-15" };
const overlap1 = { from: "2024-02-12", to: "2024-02-13" };
const overlap2 = { from: "2024-02-05", to: "2024-02-13" };
const overlap3 = { from: "2024-02-12", to: "2024-02-18" };
const overlap4 = { from: "2024-02-05", to: "2024-02-15" };
const overlap5 = { from: "2024-02-10", to: "2024-02-20" };
const overlap6 = { from: "2024-02-15", to: "2024-02-18" };
const missingFrom = { from: "", to: "2024-02-18" };
const missingTo = { from: "2024-02-15", to: "" };
const missingDate = { from: "", to: "" };

describe("Availability model perform", () => {
  beforeEach(() => {
    availabilityModel.init([]);
  });
  test("init method work correctly", () => {
    const currentList = [date1, date2];
    availabilityModel.init(currentList);
    expect(availabilityModel.dates.length).toBe(2);
    expect(availabilityModel.dates).toEqual(currentList);
  });
  describe("Availability model", () => {
    // beforeEach and other tests...
    describe("_checkOverlap method", () => {
      beforeEach(() => {
        availabilityModel.init([]);
      });

      test("should return false if there are no dates in the list", () => {
        const result = availabilityModel._checkOverlap(new Date(), new Date());
        expect(result.overlap).toBe(false);
      });

      test("should return false if new period does not overlap with any existing period", () => {
        availabilityModel.init([date2]);
        const result = availabilityModel._checkOverlap(
          new Date("2024-01-01"),
          new Date("2024-01-10")
        );
        expect(result.overlap).toBe(false);
      });

      test("should return true if new period starts within an existing period", () => {
        availabilityModel.init([date1]);
        const result = availabilityModel._checkOverlap(
          new Date("2024-02-12"),
          new Date("2024-02-20")
        );
        expect(result.overlap).toBe(true);
      });

      test("should return true if new period ends within an existing period", () => {
        availabilityModel.init([date1]);
        const result = availabilityModel._checkOverlap(
          new Date("2024-02-05"),
          new Date("2024-02-13")
        );
        expect(result.overlap).toBe(true);
      });

      test("should return true if new period encapsulates an existing period", () => {
        availabilityModel.init([date1]);
        const result = availabilityModel._checkOverlap(
          new Date("2024-02-05"),
          new Date("2024-02-20")
        );
        expect(result.overlap).toBe(true);
      });

      test("should return true if new period entirely overlaps an existing period", () => {
        availabilityModel.init([date1]);
        const result = availabilityModel._checkOverlap(
          new Date("2024-02-05"),
          new Date("2024-02-18")
        );
        expect(result.overlap).toBe(true);
      });

      test("should return false if from date is missing", () => {
        availabilityModel.init([date1]);
        const result = availabilityModel._checkOverlap(
          new Date(missingFrom.to),
          new Date(missingTo.to)
        );
        expect(result.overlap).toBe(false);
      });
    });

    describe("_isValidDate method", () => {
      test("should return true for valid date strings", () => {
        expect(availabilityModel._isValidDate("2024-02-10")).toBe(true);
        expect(availabilityModel._isValidDate("2024-12-31")).toBe(true);
      });

      test("should return false for invalid date strings", () => {
        expect(availabilityModel._isValidDate("2024-02-32")).toBe(false); // Invalid day
        expect(availabilityModel._isValidDate("2024-13-01")).toBe(false); // Invalid month
        expect(availabilityModel._isValidDate("2024/02/10")).toBe(false); // Invalid separator
        expect(availabilityModel._isValidDate("abc")).toBe(false); // Invalid format
      });
    });
  });

  describe("remove method with ", () => {
    test("index work correcyly", () => {
      availabilityModel.add(date1);
      const updatedDate = { from: "2024-02-10", to: "2024-02-19" };
      availabilityModel.update(0, { from: "2024-02-10", to: "2024-02-19" });
      expect(availabilityModel.dates.length).toBe(1);
      expect(availabilityModel.dates[0]).toStrictEqual(updatedDate);
    });
    test("oldDate work correcyly", () => {
      availabilityModel.add(date1);
      const updatedDate = { from: "2024-02-10", to: "2024-02-19" };
      availabilityModel.update(date1, { from: "2024-02-10", to: "2024-02-19" });
      expect(availabilityModel.dates.length).toBe(1);
      expect(availabilityModel.dates[0]).toStrictEqual(updatedDate);
    });
    test("wrong date throw exception work correctly", () => {
      availabilityModel.add(date1);
      const updatedDate = { from: "2024-02-10", to: "2024-02-19" };

      expect(() => {
        availabilityModel.update(date2, {
          from: "2024-02-10",
          to: "2024-02-19",
        });
      }).toThrow("Date is not found");
    });
    test("wrong index throw exception work correctly", () => {
      availabilityModel.add(date1);
      const updatedDate = { from: "2024-02-10", to: "2024-02-19" };

      expect(() => {
        availabilityModel.update(1, {
          from: "2024-02-10",
          to: "2024-02-19",
        });
      }).toThrow("Index out of range");
    });
  });

  describe("remove method with", () => {
    test("index work correctly", () => {
      availabilityModel.add(date1);
      expect(availabilityModel.dates.length).toBe(1);
      availabilityModel.remove(0);
      expect(availabilityModel.dates.length).toBe(0);
    });
    test("date work correctly", () => {
      availabilityModel.add(date1);
      expect(availabilityModel.dates.length).toBe(1);
      availabilityModel.remove(date1);
      expect(availabilityModel.dates.length).toBe(0);
    });
    test("wrong date throw exception work correctly", () => {
      availabilityModel.add(date1);
      expect(availabilityModel.dates.length).toBe(1);

      expect(() => {
        availabilityModel.remove(date2);
      }).toThrow("Date is not found");
    });
    test("wrong index throw exception work correctly", () => {
      availabilityModel.add(date1);
      expect(availabilityModel.dates.length).toBe(1);

      expect(() => {
        availabilityModel.remove(3);
      }).toThrow("Index out of range");
    });
  });

  describe("add method with ", () => {
    beforeEach(() => {
      availabilityModel.add(date1);
    });
    test("correct date work correctly", () => {
      availabilityModel.add(date2);
      expect(availabilityModel.dates.length).toBe(2);
    });
    test("overlap1 throws exception correctly", () => {
      const addWithOverlap = () => {
        availabilityModel.add(overlap1);
      };

      expect(addWithOverlap).toThrowError("overlaping dates");
    });

    test("overlap2 throws exception correctly", () => {
      const addWithOverlap = () => {
        availabilityModel.add(overlap2);
      };

      expect(addWithOverlap).toThrowError("overlaping dates");
    });

    test("overlap3 throws exception correctly", () => {
      const addWithOverlap = () => {
        availabilityModel.add(overlap3);
      };

      expect(addWithOverlap).toThrowError("overlaping dates");
    });
    test("overlap4 throws exception correctly", () => {
      const addWithOverlap = () => {
        availabilityModel.add(overlap4);
      };

      expect(addWithOverlap).toThrowError("overlaping dates");
    });
    test("overlap5 throws exception correctly", () => {
      const addWithOverlap = () => {
        availabilityModel.add(overlap5);
      };

      expect(addWithOverlap).toThrowError("overlaping dates");
    });
    test("overlap6 throws exception correctly", () => {
      const addWithOverlap = () => {
        availabilityModel.add(overlap6);
      };

      expect(addWithOverlap).toThrowError("overlaping dates");
    });
    test("missing from throws exception correctly", () => {
      const addWithOverlap = () => {
        availabilityModel.add(missingFrom);
      };

      expect(addWithOverlap).toThrowError("from is not a date");
    });
    test("missing to throws exception correctly", () => {
      const addWithOverlap = () => {
        availabilityModel.add(missingTo);
      };

      expect(addWithOverlap).toThrowError("to is not a date");
    });
    test("missing date throws exception correctly", () => {
      const addWithOverlap = () => {
        availabilityModel.add(missingDate);
      };

      expect(addWithOverlap).toThrowError("no date provided");
    });
  });
});
