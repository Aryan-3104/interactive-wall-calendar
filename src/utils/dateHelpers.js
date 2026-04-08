import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  getDay,
  isToday as isTodayFn,
  isSameDay,
  isWithinInterval,
  format,
  addMonths,
  subMonths,
  startOfDay,
  isBefore as isBeforeFn,
} from "date-fns";

/**
 * Get all days to display in the calendar grid (including days from prev/next months)
 * @param {Date} date - Any date in the month
 * @returns {Date[]} Array of dates from 6 weeks of dates
 */
export function getCalendarDays(date) {
  const monthStart = startOfMonth(date);
  const monthEnd = endOfMonth(date);

  // Find the Monday before the first day of the month (0 = Sunday, 1 = Monday)
  const startDate = new Date(monthStart);
  const dayOfWeekStart = getDay(monthStart); // 0 = Sunday

  // Calculate days to go back (to get to Monday)
  // If dayOfWeekStart is 0 (Sunday), we need to go back 6 days to get to Monday
  // If dayOfWeekStart is 1 (Monday), we don't go back
  const daysToGoBack = dayOfWeekStart === 0 ? 6 : dayOfWeekStart - 1;
  startDate.setDate(startDate.getDate() - daysToGoBack);

  // Get all days in the interval
  const days = eachDayOfInterval({
    start: startDate,
    end: new Date(monthEnd.getTime() + 6 * 24 * 60 * 60 * 1000), // Add 6 more days to fill the grid
  });

  // Return only the first 42 days (6 weeks * 7 days)
  return days.slice(0, 42);
}

/**
 * Check if a date is today
 * @param {Date} date - Date to check
 * @returns {boolean}
 */
export function isToday(date) {
  return isTodayFn(date);
}

/**
 * Check if a date is in the same month as a given date
 * @param {Date} date - Date to check
 * @param {Date} monthDate - Reference month date
 * @returns {boolean}
 */
export function isInCurrentMonth(date, monthDate) {
  return (
    date.getMonth() === monthDate.getMonth() &&
    date.getFullYear() === monthDate.getFullYear()
  );
}

/**
 * Check if a date is between two dates (inclusive)
 * @param {Date} date - Date to check
 * @param {Date} start - Range start
 * @param {Date} end - Range end
 * @returns {boolean}
 */
export function isInRange(date, start, end) {
  if (!start || !end) return false;
  const [rangeStart, rangeEnd] = start <= end ? [start, end] : [end, start];
  return isWithinInterval(date, { start: rangeStart, end: rangeEnd });
}

/**
 * Check if two dates are the same day
 * @param {Date} date1
 * @param {Date} date2
 * @returns {boolean}
 */
export function isSameDateDay(date1, date2) {
  if (!date1 || !date2) return false;
  return isSameDay(date1, date2);
}

/**
 * Format date as "YYYY-MM"
 * @param {Date} date
 * @returns {string}
 */
export function formatYearMonth(date) {
  return format(date, "yyyy-MM");
}

/**
 * Format date as "MMMM yyyy" (e.g., "January 2026")
 * @param {Date} date
 * @returns {string}
 */
export function formatMonthYear(date) {
  return format(date, "MMMM yyyy");
}

/**
 * Get the next month
 * @param {Date} date
 * @returns {Date}
 */
export function getNextMonth(date) {
  return addMonths(date, 1);
}

/**
 * Get the previous month
 * @param {Date} date
 * @returns {Date}
 */
export function getPrevMonth(date) {
  return subMonths(date, 1);
}

/**
 * Normalize date to start of day
 * @param {Date} date
 * @returns {Date}
 */
export function normalizeDateToDay(date) {
  return startOfDay(date);
}

/**
 * Check if first date is before second date
 * @param {Date} date1
 * @param {Date} date2
 * @returns {boolean}
 */
export function isBefore(date1, date2) {
  if (!date1 || !date2) return false;
  return isBeforeFn(date1, date2);
}
