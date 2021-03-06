/* eslint-env jest */

import { addItemToArray, findItemInArray, deleteItemFromArray, saveToLocalStorage, removeFromLocalStorage, findInLocalStorage } from '../lib/crudHelpers'

describe('Add, find & delete with arrays', () => {
  test('addItemToArray should add the passed item to the list', () => {
    const existingArray = [
      { name: 'two', rate: '200', id: '2' },
      { name: 'one', rate: '100', id: '1' }
    ]
    const newItem = { name: 'three', rate: '300', id: '3' }

    const expected = [
      { name: 'three', rate: '300', id: '3' },
      { name: 'two', rate: '200', id: '2' },
      { name: 'one', rate: '100', id: '1' }
    ]
    const result = addItemToArray(newItem, existingArray)
    expect(result).toEqual(expected)
  })

  test('addItemToArray should not mutate the existing array', () => {
    const existingArray = [
      { name: 'two', rate: '200', id: '2' },
      { name: 'one', rate: '100', id: '1' }
    ]
    const newItem = { name: 'three', rate: '300', id: '3' }
    const result = addItemToArray(newItem, existingArray)

    expect(result).not.toBe(existingArray)
  })

  test('findItemInArray should return the expected item from an array', () => {
    const existingArray = [
      { name: 'two', rate: '200', id: '2' },
      { name: 'one', rate: '100', id: '1' }
    ]
    const expected = [{ name: 'two', rate: '200', id: '2' }]
    const result = findItemInArray('2', existingArray)

    expect(result).toEqual(expected)
  })

  test('findItemInArray should not mutate the existing array', () => {
    const existingArray = [
      { name: 'two', rate: '200', id: '2' },
      { name: 'one', rate: '100', id: '1' }
    ]
    const result = findItemInArray('2', existingArray)

    expect(result).not.toBe(existingArray)
  })

  test('deleteItemFromArray should remove an item by id', () => {
    const existingArray = [
      { name: 'two', rate: '200', id: '2' },
      { name: 'one', rate: '100', id: '1' }
    ]
    const expected = [{ name: 'one', rate: '100', id: '1' }]
    const result = deleteItemFromArray('2', existingArray)

    expect(result).toEqual(expected)
  })

  test('deleteItemFromArray should not mutate the original array', () => {
    const existingArray = [
      { name: 'two', rate: '200', id: '2' },
      { name: 'one', rate: '100', id: '1' }
    ]
    const result = deleteItemFromArray('2', existingArray)
    expect(result).not.toBe(existingArray)
  })
})

describe('localStorage', () => {
  test('saveToLocalStorage should save an array to localStorage', () => {
    const testArray = [{ name: 'Test project', rate: '500', id: '001' }]
    saveToLocalStorage('test', testArray)
    const savedInLocalStorage = JSON.parse(window.localStorage.getItem('test'))

    expect(testArray).toEqual(savedInLocalStorage)
  },
  window.localStorage.removeItem('test')
  )

  test('findInLocalStorage should return data stored in localStorage', () => {
    const testArray = [{ name: 'Test project', rate: '500', id: '001' }]
    window.localStorage.setItem('test', JSON.stringify(testArray))
    const result = findInLocalStorage('test')

    expect(testArray).toEqual(result)
  },
  window.localStorage.removeItem('test')
  )

  test('removeFromLocalStorage should remove a key from localStorage', () => {
    const testArray = [{ name: 'Test project', rate: '500', id: '001' }]
    window.localStorage.setItem('test', JSON.stringify(testArray))
    const savedToLocal = JSON.parse(window.localStorage.getItem('test'))

    removeFromLocalStorage('test')

    expect(window.localStorage).not.toBe(savedToLocal)
  })
})
