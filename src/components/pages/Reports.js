import React, { Component } from 'react'

export class Reports extends Component {
    state = {
        projects: []
    }

    componentWillMount() {
        if (localStorage.hasOwnProperty('project')) {
            const savedProjects = JSON.parse(localStorage.getItem('project'))
            const savedTasks = JSON.parse(localStorage.getItem('task'))
            savedProjects.map(project => {
                project.tasks = []
                return savedTasks.forEach(task => {
                    if (project.name === task.parent) project.tasks.push(task.elapsed)
                })
            })
            this.setState({ projects: savedProjects })
        }
    }


    getElapsedTime = (elapsed) => {
        const hours = String(Math.floor(elapsed / (1000 * 60 * 60)) % 24)
        const minutes = String(Math.floor(elapsed / 1000 / 60) + 100).substring(1)
        const seconds = String(Math.floor((elapsed % (1000 * 60)) / 1000) + 100).substring(1)
        return `${hours}:${minutes}:${seconds}`
    }

      render() {
        const { projects } = this.state

        let projectsToDisplay = projects.length ? (
            projects.map(project => {
            return (
              <div className="collection-item" key={project.id}>
                <div className="project-title">
                  <span>{project.name}</span>
                </div>
                <div className="hourly-rate">
                    <span>{project.rate}</span>
                </div>
                   <div className='total-time'>
                   <span>{project.tasks.length ? (this.getElapsedTime(project.tasks.reduce((a, b) => a + b))) : (<span>0</span>)}</span>
                   </div>
               </div>
            )
          })
        ) : <p className="center">No tasks found.</p>
    
        return (
          <div className="container">
          <h1>Reports</h1>
          <div className="collection-heading">
            <div className="name"><span>Name</span></div>
            <div className="hourly-rate"><span>Hourly rate</span></div>
            <div className="total-time"><span>Total time</span></div>
          </div>
            <div className="collection">
              {projectsToDisplay}
            </div>
          </div>
        )
      }
}

export default Reports
