import availabilityModel from "../../model/availabilityModel";
const date1 = { from: "2024-02-10", to: "2024-02-15" };
const date2 = { from: "2024-03-10", to: "2024-03-15" };
const overlap1 = { from: "2024-02-12", to: "2024-02-13" };
const overlap2 = { from: "2024-02-05", to: "2024-02-13" };
const overlap3 = { from: "2024-02-12", to: "2024-02-18" };
const overlap4 = { from: "2024-02-05", to: "2024-02-15" };
const overlap5 = { from: "2024-02-10", to: "2024-02-20" };
const overlap6 = { from: "2024-02-15", to: "2024-02-18" };

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
    test("if availability period is inside of another availability period throws exception correctly", () => {
      expect(() => {
        availabilityModel.add(overlap1);
      }).toThrow(
        `Overlap found between ${overlap1.from} and ${overlap1.to} with ${date1.from} - ${date1.to}`
      );
    });

    test("if new availability period starts before and ends in some other period throws exception correctly", () => {
      expect(() => {
        availabilityModel.add(overlap2);
      }).toThrow(
        `Overlap found between ${overlap2.from} and ${overlap2.to} with ${date1.from} - ${date1.to}`
      );
    });
    test("if new availability period starts in some other period and ends later then other period throws exception correctly", () => {
      expect(() => {
        availabilityModel.add(overlap3);
      }).toThrow(
        `Overlap found between ${overlap3.from} and ${overlap3.to} with ${date1.from} - ${date1.to}`
      );
    });
    test("if new availability period starts in before other period and ends the same time as an another period throws exception correctly", () => {
      expect(() => {
        availabilityModel.add(overlap4);
      }).toThrow(
        `Overlap found between ${overlap4.from} and ${overlap4.to} with ${date1.from} - ${date1.to}`
      );
    });
    test("if new availability period starts same date as another period and ends later then other period throws exception correctly", () => {
      expect(() => {
        availabilityModel.add(overlap5);
      }).toThrow(
        `Overlap found between ${overlap5.from} and ${overlap5.to} with ${date1.from} - ${date1.to}`
      );
    });
    test("if new availability period starts same date as another period starts throws exception correctly", () => {
      expect(() => {
        availabilityModel.add(overlap3);
      }).toThrow(
        `Overlap found between ${overlap3.from} and ${overlap3.to} with ${date1.from} - ${date1.to}`
      );
    });
  });
});
