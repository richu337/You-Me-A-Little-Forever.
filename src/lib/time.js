/**
 * The anniversary — the single source of truth for the whole site.
 *
 * `ANNIVERSARY_DATE` is an ISO-style date string that is parsed BY HAND into
 * local calendar components (never through `new Date("2021-06-07")`, which is
 * parsed as UTC midnight and could land on June 6 in negative-offset
 * timezones). The anniversary is therefore understood as **local midnight,
 * June 7 2021, in the visitor's own timezone**, and every calculation below
 * consistently uses local time — the day can never shift to June 6 or 8.
 */
export const ANNIVERSARY_DATE = '2021-06-07'

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

const [YEAR, MONTH, DAY] = ANNIVERSARY_DATE.split('-').map(Number)

/** Local-midnight Date for the anniversary (Date months are 0-indexed). */
export const ANNIVERSARY = new Date(YEAR, MONTH - 1, DAY, 0, 0, 0, 0)

/** "June 7, 2021" — used in prose, e.g. "Since June 7, 2021". */
export const ANNIVERSARY_LONG = `${MONTHS[MONTH - 1]} ${DAY}, ${YEAR}`

/** "7 June 2021" — the site's house date format. */
export const ANNIVERSARY_DISPLAY = `${DAY} ${MONTHS[MONTH - 1]} ${YEAR}`

const EMPTY = {
  years: 0,
  months: 0,
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
}

/**
 * Calendar-accurate elapsed time between two dates, in the visitor's local
 * time. Negative parts are borrowed forward (seconds → minutes → hours →
 * days → months → years), and every part is clamped at zero so nothing can
 * ever display as negative.
 */
export function elapsedParts(from = ANNIVERSARY, now = new Date()) {
  if (!(now instanceof Date) || Number.isNaN(now.getTime())) return EMPTY
  if (now.getTime() <= from.getTime()) return EMPTY

  let years = now.getFullYear() - from.getFullYear()
  let months = now.getMonth() - from.getMonth()
  let days = now.getDate() - from.getDate()
  let hours = now.getHours() - from.getHours()
  let minutes = now.getMinutes() - from.getMinutes()
  let seconds = now.getSeconds() - from.getSeconds()

  if (seconds < 0) {
    seconds += 60
    minutes -= 1
  }
  if (minutes < 0) {
    minutes += 60
    hours -= 1
  }
  if (hours < 0) {
    hours += 24
    days -= 1
  }
  // Borrow the length of each month that has not fully passed yet
  // (a loop, so day-of-month values such as the 31st stay correct).
  let cursor = new Date(now.getFullYear(), now.getMonth(), 0)
  while (days < 0) {
    days += cursor.getDate()
    months -= 1
    cursor = new Date(cursor.getFullYear(), cursor.getMonth(), 0)
  }
  if (months < 0) {
    months += 12
    years -= 1
  }

  return {
    years: Math.max(0, years),
    months: Math.max(0, months),
    days: Math.max(0, days),
    hours: Math.max(0, hours),
    minutes: Math.max(0, minutes),
    seconds: Math.max(0, seconds),
  }
}
