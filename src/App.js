import React, { Component } from 'react'
import {
  addItemToArray,
  deleteItemFromArray,
  saveToLocalStorage,
  findInLocalStorage,
  removeFromLocalStorage,
} from './lib/crudHelpers'
import isElectron from './lib/isElectron'
import ProjectPage from './components/pages/ProjectPage'
import TaskPage from './components/pages/TaskPage'
import Reports from './components/pages/Reports'
import SideNavigation from './components/SideNavigation'
import SetCurrency from './components/projects/SetCurrency'

class App extends Component {
  state = {
    projects: [],
    showProjects: true,
    selectedProject: null,
    showReports: false,
    currency: '',
  }

  componentDidMount() {
    if (localStorage.hasOwnProperty('project')) {
      this.setState({ projects: findInLocalStorage('project') })
    }

    // Data received from Electron when user interacts with the app menu
    if (isElectron()) {
      window.ipcRenderer.on('add-project', () => {
        this.setState({
          selectedProject: null,
          showProjects: true,
          showReports: false,
        })
        this.showModal()
      })
      window.ipcRenderer.on('show-all-projects', () => {
        this.setState({
          selectedProject: null,
          showProjects: true,
          showReports: false,
          isModalOpen: false,
        })
      })
      window.ipcRenderer.on('view-reports', () => {
        this.setState({
          showReports: true,
          selectedProject: null,
          showProjects: false,
          isModalOpen: false,
        })
      })
      window.ipcRenderer.on('set-currency', () => {
        this.setState(
          {
            showCurrencySwitcher: true,
          },
          this.setState({ showCurrencySwitcher: null })
        )
      })
    }
  }

  deleteProject = ({ id }) => {
    const projects = deleteItemFromArray(id, this.state.projects)
    this.setState({ projects })

    // Remove the project from localStorage
    removeFromLocalStorage('project')
    saveToLocalStorage('project', projects)

    // Remove tasks related to the project
    const tasksInStorage = findInLocalStorage('task')
    const tasksToKeep = [...tasksInStorage.filter((task) => task.parent !== id)]
    removeFromLocalStorage('task')
    saveToLocalStorage('task', tasksToKeep)
  }

  addProject = (project) => {
    const projects = addItemToArray(project, this.state.projects)
    this.setState({ projects })
    saveToLocalStorage('project', projects)
  }

  setSelectedProject = (projectName, projectId) => {
    this.setState(
      { selectedProject: null, showProjects: false, showReports: false },
      () => {
        this.setState({ selectedProject: { projectName, projectId } })
      }
    )
  }

  editProject = (editedProject) => {
    const project = {
      name: editedProject.name,
      rate: editedProject.rate,
      id: editedProject.id,
    }

    const allExceptEdited = deleteItemFromArray(
      editedProject.id,
      this.state.projects
    )
    const projects = addItemToArray(project, allExceptEdited)

    this.setState({ projects })

    removeFromLocalStorage('project')
    saveToLocalStorage('project', projects)
  }

  showModal = () => {
    this.setState({ isModalOpen: true }, this.setState({ isModalOpen: false }))
  }

  getProps = () => ({
    addProject: this.addProject,
    state: this.state,
    deleteProject: this.deleteProject,
    editProject: this.editProject,
    setSelectedProject: this.setSelectedProject,
  })

  setCurrency = (currency) => {
    this.setState({ currency })
  }

  // Send data to Electron
  timerIsRunning = ({ task }) => {
    if (isElectron()) {
      if (task.start && !task.end) {
        window.ipcRenderer.send('timer-running')
      } else if (task.end) {
        window.ipcRenderer.send('timer-stopped')
      }
    }
  }

  renderSideNav = () => (
    <SideNavigation {...this.getProps()} setState={this.setState.bind(this)} />
  )

  render() {
    const {
      selectedProject,
      showReports,
      showProjects,
      currency,
      showCurrencySwitcher,
    } = this.state
    return (
      <main>
        {showProjects && (
          <ProjectPage {...this.getProps()} currency={currency} />
        )}
        {selectedProject && (
          <TaskPage
            timerIsRunning={this.timerIsRunning}
            selectedProject={selectedProject}
            setState={this.setState.bind(this)}
          >
            {' '}
            {this.renderSideNav()}{' '}
          </TaskPage>
        )}

        {showReports && (
          <Reports currency={currency}>{this.renderSideNav()}</Reports>
        )}
        {showCurrencySwitcher && (
          <SetCurrency onCurrencyUpdate={this.setCurrency} />
        )}
      </main>
    )
  }
}

export default App
