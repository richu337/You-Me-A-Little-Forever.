/** The day this whole story began. */
export const ANNIVERSARY = new Date(2020, 5, 6, 0, 0, 0, 0)

export const ANNIVERSARY_LONG = 'June 6, 2020'
export const ANNIVERSARY_SHORT = '06 · 06 · 2020'

const EMPTY = {
  years: 0,
  months: 0,
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
  totalDays: 0,
  totalHours: 0,
  totalSeconds: 0,
  totalHeartbeats: 0,
}

/**
 * Calendar-accurate elapsed time between two dates, plus a few
 * "flourish" totals for the smaller print.
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
  if (days < 0) {
    // borrow the length of the month that just ended
    days += new Date(now.getFullYear(), now.getMonth(), 0).getDate()
    months -= 1
  }
  if (months < 0) {
    months += 12
    years -= 1
  }

  const ms = now.getTime() - from.getTime()

  return {
    years,
    months,
    days,
    hours,
    minutes,
    seconds,
    totalDays: Math.floor(ms / 86400000),
    totalHours: Math.floor(ms / 3600000),
    totalSeconds: Math.floor(ms / 1000),
    // a resting heart, roughly 70 beats a minute
    totalHeartbeats: Math.floor((ms / 60000) * 70),
  }
}

const formatter = new Intl.NumberFormat('en-US')

export function formatNumber(value) {
  return formatter.format(Math.max(0, Math.floor(value)))
}
