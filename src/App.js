import React, { Component } from 'react'
import { addItemToArray, deleteItemFromArray, saveToLocalStorage, findInLocalStorage, removeFromLocalStorage } from './lib/crudHelpers'
import isElectron from './lib/isElectron'
import ProjectPage from './components/pages/ProjectPage'
import TaskPage from './components/pages/TaskPage'
import Reports from './components/pages/Reports'


class App extends Component {
  state = {
    projects: [],
    showProjects: true,
    selectedProject: null,
    showReports: null
  }

  componentDidMount() {
    if (localStorage.hasOwnProperty('project')) {
      this.setState({ projects: findInLocalStorage('project') })
    }

    if (isElectron()) {
      window.ipcRenderer.on('add-project', () => {
        this.setState({ selectedProject: '', showProjects: true, showReports: false })
        this.showModal()
      })
      window.ipcRenderer.on('show-all-projects', () => {
        this.setState({ selectedProject: '', showProjects: true, isModalOpen: false, showReports: false })
      })
      window.ipcRenderer.on('view-reports', () => {
        this.setState({ showReports: true, selectedProject: null, showProjects: null })
      })
    }
  }

  deleteProject = ({id}) => {
    const projects = deleteItemFromArray(id, this.state.projects)
    this.setState({ projects })

    // Remove the project from localStorage
    removeFromLocalStorage('project')
    saveToLocalStorage('project', projects)

    // Remove tasks related to the project
    const tasksInStorage = findInLocalStorage('task')
    const tasksToKeep = [...tasksInStorage.filter(task => task.parent !== id)]
    removeFromLocalStorage('task')
    saveToLocalStorage('task', tasksToKeep)
  }

  addProject = (project) => {
    const projects = addItemToArray(project, this.state.projects)
    this.setState({ projects })
    saveToLocalStorage('project', projects)
  }

  setSelectedProject = (projectName, projectId) => {
      this.setState({ selectedProject: '', showProjects: null, showReports: null }, () => {
        this.setState({ selectedProject: {projectName, projectId}})
      })
  }

  editProject = editedProject => {    
    const project = {
      name: editedProject.name,
      rate: editedProject.rate,
      id: editedProject.id,
    }

    const allExceptEdited = deleteItemFromArray(editedProject.id, this.state.projects)
    const projects = addItemToArray(project, allExceptEdited)

    this.setState({ projects })

    removeFromLocalStorage('project')
    saveToLocalStorage('project', projects)
  }
  
  showModal = () => {
    this.setState({isModalOpen: true }, this.setState({ isModalOpen: false }))
  }

  getProps = () => ({
    addProject: this.addProject,
    state: this.state,
    deleteProject: this.deleteProject,
    editProject: this.editProject,
    setSelectedProject: this.setSelectedProject
  })

  render () {
    const { selectedProject, showReports, showProjects } = this.state
    return (
      <main>
        {showProjects && <ProjectPage {...this.getProps()} /> }
        {selectedProject && <TaskPage {...this.getProps()} setState={this.setState.bind(this)} />}
        {showReports && <Reports />}
      </main>
    )
  }
}

export default App
