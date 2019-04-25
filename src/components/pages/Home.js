import React, { Component } from 'react'
import Projects from '../projects/Projects'
import AddProject from '../projects/AddProject'
import { Modal, Button } from 'react-materialize'
import Tasks from '../projects/todos/Tasks'


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

  deleteProject = ({id, name}) => {
    const projects = this.state.projects.filter(project => {
      return project.id !== id
    })
    this.setState({ projects })

    // Remove the project from localStorage
    const dataInStorage = JSON.parse(localStorage.getItem('project'))
    const filteredItem = [...dataInStorage.filter(project => project.id !== id)]
    localStorage.removeItem('project')
    localStorage.setItem('project', JSON.stringify(filteredItem))
    

    // Remove the tasks added to the project from localStorage
    const tasksInStorage = JSON.parse(localStorage.getItem('task'))
    const filteredTasks = [...tasksInStorage.filter(task => task.parent !== name)]
    localStorage.removeItem('task')
    localStorage.setItem('task', JSON.stringify(filteredTasks))
  }

  addProject = (project) => {
    project.id = Math.random()
    let projects = [project, ...this.state.projects]
    this.setState({ projects })

    // Save the added task to localStorage together with the existing
    const allProjects = [project, ...this.state.projects]
    localStorage.setItem('project', JSON.stringify(allProjects))
  }

  showTasks = (project) => {
      this.setState({ selectedProject: '' }, () => {
        this.setState({ selectedProject: project})
      })
  }


  render () {
    return (
      <div className="container home">
        <h1 className='center'>Projects</h1>

        <div className="list-of-projects">
          <Modal trigger={<Button>Add project</Button>}>
            <AddProject addProject={this.addProject} projects={this.state.projects} />
          </Modal>
          <Projects projects={this.state.projects} deleteProject={this.deleteProject} selectedProject={this.showTasks} />
        </div>
        <div className="list-of-tasks">
        {this.state.selectedProject ? <Tasks project={this.state.selectedProject}></Tasks> : ''}
        </div>
      </div>
    )
  }
}

export default Home
