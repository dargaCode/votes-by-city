import {
  DATE_A,
  DATE_A_NEXT_DAY_STRING,
  INCLUSIVE_DATE_RANGE_A_TO_B,
  DATE_A_TEN_SEQUENTIAL_DAYS_STRINGS,
  DATE_B
} from "./mockDateUtilsData";
import {
  getOneDayAfter,
  getNSequentialDaysFromStart,
  getDateRangeInclusiveDayCount,
  isDateRangeValid
} from "./dateUtils";
import { DATE_FORMAT } from "./dateConstants";

describe("dateUtils", () => {
  describe("getOneDateAfter", () => {
    it("should return the next day", () => {
      const tomorrow = getOneDayAfter(DATE_A);

      expect(tomorrow.format(DATE_FORMAT)).toBe(DATE_A_NEXT_DAY_STRING);
    });
  });

  describe("getNSequentialDaysFromStart", () => {
    it("should return an array of moments with the specified length", () => {
      const dates = getNSequentialDaysFromStart(DATE_A, 10);

      expect(dates).toHaveLength(DATE_A_TEN_SEQUENTIAL_DAYS_STRINGS.length);
    });

    it("should return an array of the correct sequential dates", () => {
      const dates = getNSequentialDaysFromStart(DATE_A, 10);

      dates.forEach((date, i) => {
        expect(date.format(DATE_FORMAT)).toBe(
          DATE_A_TEN_SEQUENTIAL_DAYS_STRINGS[i]
        );
      });
    });
  });

  describe("getDateRangeInclusiveDayCount", () => {
    it("should return the diff between start and end dates, plus 1", () => {
      const range = getDateRangeInclusiveDayCount(DATE_A, DATE_B);

      expect(range).toBe(INCLUSIVE_DATE_RANGE_A_TO_B);
    });
  });

  describe("isDateRangeValid", () => {
    describe("when startDate is after endDate", () => {
      it("should return false", () => {
        expect(isDateRangeValid(DATE_B, DATE_A)).toBe(false);
      });
    });

    describe("when startDate is before endDate", () => {
      it("should return true", () => {
        expect(isDateRangeValid(DATE_A, DATE_B)).toBe(true);
      });
    });

    describe("when startDate the same as endDate", () => {
      it("should return true", () => {
        expect(isDateRangeValid(DATE_A, DATE_A)).toBe(true);
      });
    });
  });
});
