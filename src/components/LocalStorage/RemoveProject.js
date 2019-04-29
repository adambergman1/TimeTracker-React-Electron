/**
 *  Removes a project from localStorage
 *
 * @param {id} id - the ID which belongs to the project
 */

const removeProject = (id) => {
  const dataInStorage = JSON.parse(window.localStorage.getItem('project'))
  const filteredItems = [...dataInStorage.filter(project => project.id !== id)]
  window.localStorage.removeItem('project')
  window.localStorage.setItem('project', JSON.stringify(filteredItems))
}

export default removeProject
