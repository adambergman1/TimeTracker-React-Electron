/**
 * Method to get the time that has elapsed in the format H:M:S
 *
 * @param {elapsed} elapsed - the time that has elapsed
 */

const getElapsedTime = (elapsed) => {
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

export default getElapsedTime
