import React, { Component } from 'react'
import Projects from '../projects/Projects'
import AddProject from '../projects/AddProject'
import { Modal, Button, SideNav } from 'react-materialize'
import Tasks from '../projects/todos/Tasks'
import { addItemToArray, deleteItemFromArray, saveToLocalStorage, findInLocalStorage, removeFromLocalStorage } from '../../lib/crudHelpers'


class Home extends Component {
  state = {
    projects: []
  }

  componentWillMount() {
    if (localStorage.hasOwnProperty('project')) {
      this.setState({ projects: findInLocalStorage('project') })
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
    const allProjectsExceptEdited = this.state.projects.filter(project => project.id !== editedProject.id)
    const projects = addItemToArray(project, allProjectsExceptEdited)

    this.setState({ projects })

    removeFromLocalStorage('project')
    saveToLocalStorage('project', projects)
  }

  renderTasks = () => {
    return (
      <React.Fragment>
        <div className="col m6 padding-up-and-down right">
          <SideNav trigger={<Button className="right">All projects</Button>} options={{closeOnClick: true}}>
            <Modal trigger={<Button>Add new project</Button>}>
              <AddProject addProject={this.addProject} projects={this.state.projects} />
            </Modal>
            <Projects projects={this.state.projects} deleteProject={this.deleteProject} selectedProject={this.setSelectedProject} editProject={this.editProject} />
          </SideNav>
        </div>

        <Tasks project={this.state.selectedProject}></Tasks>
      </React.Fragment>
    )
  }

  renderProjects = () => {
    return (
      <React.Fragment>
        <div className="col m6 padding-up-and-down">
            <h4>Projects</h4>
        </div>
        <div className="col m6 padding-up-and-down right">
            <Modal trigger={<Button className="right">+ Add</Button>}>
              <AddProject addProject={this.addProject} projects={this.state.projects} />
            </Modal>
        </div>
        <div className="col s12">
          <Projects projects={this.state.projects} deleteProject={this.deleteProject} selectedProject={this.setSelectedProject} editProject={this.editProject} />
        </div>
      </React.Fragment>
    )
  }


  render () {
    return (
      <main>
        <div className="section">
        <div className="container home">
          <div className="row">  
            {this.state.selectedProject ? this.renderTasks() : this.renderProjects()}
            </div>
          </div>
        </div>
      </main>
    )
  }
}

export default Home
