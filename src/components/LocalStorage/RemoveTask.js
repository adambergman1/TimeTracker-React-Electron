/**
 *  Removes a task from localStorage
 *
 * @param {id} id - the ID which belongs to the task
 */

const removeTaskFromLocalStorage = id => {
  const tasksInLocalStorage = JSON.parse(window.localStorage.getItem('task'))
  const allTasksExceptDeleted = tasksInLocalStorage.filter(task => task.id !== id)

  window.localStorage.removeItem('task')
  window.localStorage.setItem('task', JSON.stringify(allTasksExceptDeleted))
}

export default removeTaskFromLocalStorage
