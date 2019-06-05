/**
 * Converts milliseconds into the format HH:MM:SS
 * @param {elapsed} elapsed - time in milliseconds
 */

export const getElapsedTime = elapsed => {
  let seconds = Math.floor(elapsed / 1000)
  let minutes = Math.floor(seconds / 60)
  seconds = seconds % 60
  let hours = Math.floor(minutes / 60)
  minutes = minutes % 60
  let days = Math.floor(hours / 24)
  hours = hours % 24
  hours += days * 24

  return ((hours + '').length === 1 ? '0' + hours : hours) + ':' + ('0' + minutes).substr(-2) + ':' + ('0' + seconds).substr(-2)
}

/**
 * Returns a date formatted in DD/MM/YYYY
 * @param {date} date - the date to convert
 */
export const getShortDate = date => {
  const d = new Date(date)
  const dateOfMonth = d.getUTCDate()
  const monthOfYear = d.getUTCMonth() + 1
  const year = d.getUTCFullYear()
  return dateOfMonth + '/' + monthOfYear + '/' + year
}

/**
 * Converts time in the format HH:MM:SS to milliseconds
 * @param {time} time - the time received (HH:MM:SS format)
 */
export const convertPrettyTimeToMS = time => {
  const hhmmss = time.split(':')
  if (!hhmmss[0]) hhmmss[0] = '00'
  if (!hhmmss[1]) hhmmss[1] = '00'
  if (!hhmmss[2]) hhmmss[2] = '00'
  const result = Date.UTC(1970, 0, 1, hhmmss[0], hhmmss[1], hhmmss[2])
  return result
}
