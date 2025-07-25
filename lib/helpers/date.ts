/**
 * Date formatting utilities
 */

interface FormatRelativeDateOptions {
  includeTime?: boolean;
}

// Constants to avoid magic numbers and strings (DRY)
const TIME_UNITS = {
  HOUR_IN_MS: 1000 * 60 * 60,
  HOURS_IN_DAY: 24,
  HOURS_IN_TWO_DAYS: 48,
  DAYS_IN_WEEK: 7,
} as const;

const LOCALE_CONFIG = {
  LOCALE: "en-US",
  DATE_OPTIONS: {
    month: "short" as const,
    day: "numeric" as const,
  },
  TIME_OPTIONS: {
    hour: "numeric" as const,
    minute: "2-digit" as const,
    hour12: true,
  },
} as const;

/**
 * Calculates the time difference in hours between two dates
 * @param date - The target date to compare against
 * @param now - The current date/time reference point
 * @returns The difference in hours as a whole number
 */
function calculateHoursDifference(date: Date, now: Date): number {
  return Math.floor((now.getTime() - date.getTime()) / TIME_UNITS.HOUR_IN_MS);
}

/**
 * Converts hours difference into days difference
 * @param hoursDifference - The difference in hours to convert
 * @returns The difference in days as a whole number
 */
function calculateDaysDifference(hoursDifference: number): number {
  return Math.floor(hoursDifference / TIME_UNITS.HOURS_IN_DAY);
}

/**
 * Formats a date into a localized time string
 * @param date - The date to format into a time string
 * @returns A formatted time string in 12-hour format
 */
function formatTimeString(date: Date): string {
  return date.toLocaleTimeString(LOCALE_CONFIG.LOCALE, LOCALE_CONFIG.TIME_OPTIONS);
}

/**
 * Formats a date into an absolute date string, optionally including year
 * @param date - The date to format
 * @param now - Current date used to determine if year should be included
 * @returns A formatted date string with month and day, and year if different from current year
 */
function formatAbsoluteDate(date: Date, now: Date): string {
  const options = {
    ...LOCALE_CONFIG.DATE_OPTIONS,
    year: date.getFullYear() !== now.getFullYear() ? ("numeric" as const) : undefined,
  };

  return date.toLocaleDateString(LOCALE_CONFIG.LOCALE, options);
}

/**
 * Determines the appropriate relative date string based on time difference
 * @param diffInHours - The difference in hours between dates
 * @param date - The original date being formatted
 * @param now - The current date/time reference point
 * @returns A human-readable relative date string
 */
function getRelativeDateString(diffInHours: number, date: Date, now: Date): string {
  if (diffInHours < 1) return "just now";
  if (diffInHours < TIME_UNITS.HOURS_IN_DAY) return `${diffInHours}h ago`;
  if (diffInHours < TIME_UNITS.HOURS_IN_TWO_DAYS) return "yesterday";

  const diffInDays = calculateDaysDifference(diffInHours);
  if (diffInDays < TIME_UNITS.DAYS_IN_WEEK) return `${diffInDays}d ago`;

  return formatAbsoluteDate(date, now);
}

/**
 * Appends time information to a date string if requested
 * @param result - The base date string to potentially append time to
 * @param date - The date to extract time information from
 * @param includeTime - Whether time should be appended to the result
 * @returns The original result string, optionally with time appended in parentheses
 */
function appendTimeIfRequested(result: string, date: Date, includeTime: boolean): string {
  if (!includeTime) return result;

  const timeString = formatTimeString(date);
  return `${result} (${timeString})`;
}

/**
 * Formats a date string into a human-readable relative date format
 * @param dateString - The date string to format (should be parseable by Date constructor)
 * @param options - Configuration options for formatting behavior
 * @returns A formatted relative date string like "2h ago", "yesterday", or "Dec 15"
 */
export function formatRelativeDate(dateString: string, options?: FormatRelativeDateOptions): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInHours = calculateHoursDifference(date, now);

  const relativeDateString = getRelativeDateString(diffInHours, date, now);

  return appendTimeIfRequested(relativeDateString, date, options?.includeTime ?? false);
}
