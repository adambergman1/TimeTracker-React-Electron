import React, { Component } from 'react'
import { addItemToArray, deleteItemFromArray, saveToLocalStorage, findInLocalStorage, removeFromLocalStorage } from '../../lib/crudHelpers'
import isElectron from '../../lib/isElectron'
import ProjectPage from './Projects'
import TaskPage from '../pages/TaskPage'


class Home extends Component {
  state = {
    projects: []
  }

  componentDidMount() {
    if (localStorage.hasOwnProperty('project')) {
      this.setState({ projects: findInLocalStorage('project') })
    }
    // if (isElectron()) {
    //   window.ipcRenderer.on('add-project', () => {
    //     this.setState({ selectedProject: '' })
    //     this.showModal()
    //   })
    //   window.ipcRenderer.on('show-all-projects', () => {
    //     this.setState({ selectedProject: '', isModalOpen: false })
    //   })
    //   window.ipcRenderer.on('view-reports', () => {
    //     this.props.history.push('/Reports')
    //   })
    // }
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
      this.setState({ selectedProject: '' }, () => {
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

  renderTasks = () =>
    <TaskPage
      addProject={this.addProject}
      state={this.state}
      deleteProject={this.deleteProject}
      editProject={this.editProject}
      setState={this.setState.bind(this)}
      setSelectedProject={this.setSelectedProject}
    />

  renderProjects = () => 
  <ProjectPage
    addProject={this.addProject}
    state={this.state}
    deleteProject={this.deleteProject}
    editProject={this.editProject}
    setSelectedProject={this.setSelectedProject}
    />

  showModal = () => {
    this.setState({isModalOpen: true }, this.setState({ isModalOpen: false }))
  }

  render () {  
    return (
      <main>
        {this.state.selectedProject ? this.renderTasks() : this.renderProjects()}
      </main>
    )
  }
}

export default Home
