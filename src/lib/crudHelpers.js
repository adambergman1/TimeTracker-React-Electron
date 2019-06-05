/**
 * Adds an item to an array
 * @param {item} item - the item to add
 * @param {list} list - the array the item should be added to
 */
export const addItemToArray = (item, list) => [item, ...list]

/**
 * Deletes an item from an array
 * @param {id} id - The ID of the item to delete
 * @param {list} list - the array the item should be deleted from
 */
export const deleteItemFromArray = (id, list) => list.filter(item => item.id !== id)

/**
 * Finds an item in an array
 * @param {id} id - the id to find
 * @param {list} list - the array to look through
 */
export const findItemInArray = (id, list) => list.filter(item => item.id === id)

/**
 * Saves data to localStorage
 * @param {key} key - the name of the object
 * @param {array} array - the data to be saved
 */
export const saveToLocalStorage = (key, array) => window.localStorage.setItem(key, JSON.stringify(array))

/**
 * Finds data in localStorage based on the name of the object
 * @param {key} key - the name to look for
 */
export const findInLocalStorage = (key) => JSON.parse(window.localStorage.getItem(key))

/**
 * Removes an entire key with its object from localStorage
 * @param {key} key - the key to remove
 */
export const removeFromLocalStorage = key => window.localStorage.removeItem(key)
