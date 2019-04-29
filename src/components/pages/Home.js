import React, { Component } from 'react'
import Projects from '../projects/Projects'
import AddProject from '../projects/AddProject'
import { Modal, Button, SideNav } from 'react-materialize'
import Tasks from '../projects/todos/Tasks'
import removeProject from '../LocalStorage/RemoveProject'
import removeTasksFromProject from '../LocalStorage/RemoveTasksFromProject'
import uuid from 'uuid'


class Home extends Component {
  state = {
    projects: []
  }

  componentWillMount() {
    if (localStorage.hasOwnProperty('project')) {
      const projects = JSON.parse(localStorage.getItem('project'))
      this.setState({
        projects
      })
    }
  }

  deleteProject = ({id}) => {
    const projects = this.state.projects.filter(project => {
      return project.id !== id
    })
    this.setState({ projects })

    removeProject(id)
    removeTasksFromProject(id)
  }

  addProject = (project) => {
    project.id = uuid()
    const projects = [project, ...this.state.projects]
    this.setState({ projects })

    // Save the added task to localStorage together with the existing
    const allProjects = [project, ...this.state.projects]
    localStorage.setItem('project', JSON.stringify(allProjects))
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
    const projects = [project, ...allProjectsExceptEdited]

    this.setState({ projects })
    localStorage.removeItem('project')
    localStorage.setItem('project', JSON.stringify(projects))
  }

  renderTasks = () => {
    return (
      <React.Fragment>
        <div className="col m6 padding-up-and-down right">
          <SideNav trigger={<Button className="right">Projects</Button>} options={{closeOnClick: true}}>
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
