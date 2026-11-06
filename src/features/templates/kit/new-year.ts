/**
 * The year a New Year wish celebrates: from July the coming New Year is next year's;
 * from January to June it is the year that just began.
 */
export function newYearFor(date: Date = new Date()): number {
  const y = date.getFullYear();
  return date.getMonth() >= 6 ? y + 1 : y;
}
