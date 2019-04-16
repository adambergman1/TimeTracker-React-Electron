import React, { Component } from 'react'
import Projects from '../projects/Projects'
import AddProject from '../projects/AddProject'

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

  deleteProject = (id) => {
    const projects = this.state.projects.filter(project => {
      return project.id !== id
    })
    this.setState({ projects })

    const dataInStorage = JSON.parse(localStorage.getItem('project'))
    const filteredItem = [...dataInStorage.filter(project => project.id !== id)]
    localStorage.removeItem('project')
    localStorage.setItem('project', JSON.stringify(filteredItem))
  }

  addProject = (project) => {
    project.id = Math.random()
    let projects = [...this.state.projects, project]
    this.setState({ projects })

    // Save the added task to localStorage together with the existing
    const allProjects = [...this.state.projects, project]
    localStorage.setItem('project', JSON.stringify(allProjects))
  }


  render () {
    return (
      <div className="container">
        <h1 className='center blue-text'>Projects</h1>
        <Projects projects={this.state.projects} deleteProject={this.deleteProject} />
        <AddProject addProject={this.addProject} />
      </div>
    )
  }
}

export default Home
