/**
 *  Removes all tasks that are related to a project in localStorage
 *
 * @param {id} id - the id of the project
 */

export const removeTasksFromProject = id => {
  const tasksInStorage = JSON.parse(window.localStorage.getItem('task'))
  const filteredTasks = [...tasksInStorage.filter(task => task.parent !== id)]
  window.localStorage.removeItem('task')
  window.localStorage.setItem('task', JSON.stringify(filteredTasks))
}

export default removeTasksFromProject
