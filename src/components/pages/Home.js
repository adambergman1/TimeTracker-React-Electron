import React, { Component } from 'react'
import Projects from '../projects/Projects'
import AddProject from '../projects/AddProject'

class Home extends Component {
  state = {
    projects: [
      {id: 1, name: '1dv430'},
      {id: 2, name: '1dv024'}
    ]
  }

  deleteProject = (id) => {
    const projects = this.state.projects.filter(project => {
      return project.id !== id
    })
    this.setState({ projects })
  }

  addProject = (project) => {
    project.id = Math.random()
    let projects = [...this.state.projects, project]
    this.setState({ projects })
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
