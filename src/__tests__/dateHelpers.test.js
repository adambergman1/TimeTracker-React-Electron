/* eslint-env jest */

import { getElapsedTime, getShortDate } from '../lib/dateHelpers'

describe('Date formatting', () => {
  test('getElapsedTime should return the time in format HH:MM:SS', () => {
    const elapsed = 5004
    const result = getElapsedTime(elapsed)

    const expected = '00:00:05'

    expect(result).toEqual(expected)
  })

  test('getShortDate should return a date in the format DD/MM/YY', () => {
    const date = 'Sat May 04 2019 15:41:13 GMT+0200 (centraleuropeisk sommartid)'
    const result = getShortDate(date)
    const expected = '4/5/2019'

    expect(result).toEqual(expected)
  })
})
