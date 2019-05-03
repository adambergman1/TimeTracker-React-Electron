export const addItemToArray = (item, list) => [item, ...list]

export const deleteItemFromArray = (id, list) => list.filter(item => item.id !== id)

export const findItemInArray = (id, list) => list.filter(item => item.id === id)

export const saveToLocalStorage = (key, array) => window.localStorage.setItem(key, JSON.stringify(array))

export const findInLocalStorage = (key) => JSON.parse(window.localStorage.getItem(key))

export const removeFromLocalStorage = key => window.localStorage.removeItem(key)
