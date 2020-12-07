import moment from "moment";
import { DATE_FORMAT } from "./dateConstants";

export const DATE_A = moment("2018-01-01", DATE_FORMAT);

export const DATE_A_NEXT_DAY_STRING = "2018-01-02";

export const DATE_B = moment("2018-01-10", DATE_FORMAT);

export const INCLUSIVE_DATE_RANGE_A_TO_B = 10;

export const DATE_A_TEN_SEQUENTIAL_DAYS_STRINGS = [
  "2018-01-01",
  "2018-01-02",
  "2018-01-03",
  "2018-01-04",
  "2018-01-05",
  "2018-01-06",
  "2018-01-07",
  "2018-01-08",
  "2018-01-09",
  "2018-01-10"
];
