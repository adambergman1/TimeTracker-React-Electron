import React, { Component } from 'react'
import { addItemToArray, deleteItemFromArray, saveToLocalStorage, findInLocalStorage, removeFromLocalStorage } from './lib/crudHelpers'
import isElectron from './lib/isElectron'
import ProjectPage from './components/pages/Projects'
import TaskPage from './components/pages/TaskPage'
import Reports from './components/pages/Reports'


class App extends Component {
  state = {
    projects: []
  }

  componentDidMount() {
    if (localStorage.hasOwnProperty('project')) {
      this.setState({ projects: findInLocalStorage('project') })
    }

    if (isElectron()) {
      window.ipcRenderer.on('add-project', () => {
        console.log('Adding project');
        // this.setState({ selectedProject: '' })
        // this.showModal()
      })
      window.ipcRenderer.on('show-all-projects', () => {
        console.log('Showing all projects');
        // this.setState({ selectedProject: '', isModalOpen: false })
      })
      window.ipcRenderer.on('view-reports', () => {
        console.log('Viewing reports from App')
        this.setState({showReports: true})
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
    return (
      <main>
        {this.state.selectedProject
          ? <TaskPage {...this.getProps()} setState={this.setState.bind(this)} />
          : <ProjectPage {...this.getProps()} />
        }
        
        {this.state.showReports && <Reports />}
      </main>
    )
  }
}

export default App
