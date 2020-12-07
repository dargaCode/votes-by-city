import moment from "moment";

export function getOneDayAfter(date: moment.Moment): moment.Moment {
  return date.clone().add(1, "day");
}

/**
 * return moments for the start date and n-1 sequential
 * days after that. Sequence is every day, no gaps.
 *
 * @param startDate day to start counting from
 * @param dayCount how many days to return total
 */
export function getNSequentialDaysFromStart(
  startDate: moment.Moment,
  dayCount: number
): moment.Moment[] {
  const dates: moment.Moment[] = [];
  const currentDate = startDate.clone();

  for (let i = 0; i < dayCount; i++) {
    const date = currentDate.clone();

    dates.push(date);
    currentDate.add(1, "days");
  }

  return dates;
}

/**
 * returns the total days between start and end date, inclusive
 * of both the start date and end date
 * @param startDate from the beginning of this day
 * @param endDate to the end of this day
 */
export function getDateRangeInclusiveDayCount(
  startDate: moment.Moment,
  endDate: moment.Moment
): number | undefined {
  // inclusive of both start and end dates
  return 1 + endDate.diff(startDate, "days");
}

/**
 * return false if the end is before the beginning
 * @param startDate
 * @param endDate
 */
export function isDateRangeValid(
  startDate: moment.Moment,
  endDate: moment.Moment
): boolean {
  return endDate.isSameOrAfter(startDate);
}
