import React, { Component } from 'react'
import Projects from '../projects/Projects'
import AddProject from '../projects/AddProject'
import Tasks from '../todos/Tasks'
import { Modal, Button, SideNav } from 'react-materialize'
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

    const allExceptEdited = deleteItemFromArray(editedProject.id, this.state.projects)
    const projects = addItemToArray(project, allExceptEdited)

    this.setState({ projects })

    removeFromLocalStorage('project')
    saveToLocalStorage('project', projects)
  }

  renderTasks = () => {
    return (
      <React.Fragment>
        <div className="section red darken-3">
          <div className="container">
            <div className="row">
              <div className="col s12 flex align-items-center">
                <div className="col m6">
                  <h4 className="page-title">{this.state.selectedProject.projectName}</h4>
                </div>
                <div className="col m6">
                  <SideNav trigger={<Button className="right green darken-1">All projects</Button>} options={{closeOnClick: true}}>
                    <Modal trigger={<Button>+ Add new project</Button>}>
                      <AddProject addProject={this.addProject} projects={this.state.projects} />
                    </Modal>
                    <Projects projects={this.state.projects} deleteProject={this.deleteProject} selectedProject={this.setSelectedProject} editProject={this.editProject} />
                    <button className="btn grey waves-effect" onClick={() => this.setState({selectedProject: null })}>All projects</button>
                  </SideNav>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="section">
          <div className="container">
            <div className="row">
             <Tasks project={this.state.selectedProject}></Tasks>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }

  renderProjects = () => {
    return (
      <React.Fragment>
        <div className="section red darken-3">
          <div className="container home">
            <div className="row">
              <div className="col s12 flex align-items-center">
                <div className="col m6">
                    <h4 className="page-title">Projects</h4>
                </div>
                <div className="col m6">
                  <Modal trigger={<Button className="btn-small right green darken-1">+ Add project</Button>}>
                    <AddProject addProject={this.addProject} projects={this.state.projects} />
                  </Modal>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="section">
          <div className="container home">
            <div className="row">
              <div className="col s12">
                <Projects projects={this.state.projects} deleteProject={this.deleteProject} selectedProject={this.setSelectedProject} editProject={this.editProject} />
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
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
