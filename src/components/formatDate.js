/**
 *  Converting date object to DD/MM/YYYY
 *
 * @param {id} id - the date object to convert
 */

const getShortDate = date => {
  const d = new Date(date)
  const dateOfMonth = d.getUTCDate()
  const monthOfYear = d.getUTCMonth() + 1
  const year = d.getUTCFullYear()
  return dateOfMonth + '/' + monthOfYear + '/' + year
}

export default getShortDate
