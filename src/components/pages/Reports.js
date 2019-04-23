import React, { Component } from 'react'
import DateRangePicker from '../Reports/DateRangePicker'

export class Reports extends Component {
    state = {
        projects: [],
        startDate: new Date(new Date().setDate(new Date().getDate() - 30)).toString(),
        endDate: new Date().toString()
    }

    componentWillMount() {
        if (localStorage.hasOwnProperty('project')) {
            const savedProjects = JSON.parse(localStorage.getItem('project'))
            const savedTasks = JSON.parse(localStorage.getItem('task'))
            
            savedProjects.map(project => {
                project.tasks = []
                return savedTasks.forEach(task => {
                    if (project.name === task.parent) project.tasks.push(task)
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

    changeStartDate = (start) => {
      console.log('Start date from dateRangePicker', start.start)
      this.setState({ startDate: new Date(start.start) })
    }

    changeEndDate = (end) => {
      console.log('End date from dateRangePicker', end.end)
      this.setState({ endDate: new Date(end.end) })
    }

    withoutTime = (date) => {
      return new Date(date).setHours(0, 0, 0, 0)
    }

      render() {
        const { projects, startDate, endDate } = this.state

        let projectsToDisplay = projects.length ? (
            projects.map(project => {
              let elapsed = []
              project.tasks.forEach(task => {
                if (project.name === task.parent) {

                  if (this.withoutTime(task.created) >= this.withoutTime(startDate) && 
                  this.withoutTime(task.created) <= this.withoutTime(endDate)) {
                    elapsed.push(task.elapsed)
                  }

                  // if (new Date(task.created).getTime() >= new Date(startDate).getTime() && 
                  // new Date(task.created).getTime() <= new Date(endDate).getTime()) {
                  //   elapsed.push(task.elapsed)
                  // }
                }
              })
              console.log(elapsed)

            return (
              <div className="collection-item" key={project.id}>
                <div className="project-title">
                  <span>{project.name}</span>
                </div>
                <div className="hourly-rate">
                    <span>{project.rate}</span>
                </div>
                   <div className='total-time'>
                   <span>{project.tasks.length ? elapsed.length ? (this.getElapsedTime(elapsed.reduce((a, b) => a + b))) : 'Could not find anything' : '0'}</span>
                   </div>
               </div>
            )
          })
        ) : <p className="center">No tasks found.</p>
    
        return (
          <div className="container">

          <h1>Reports</h1>
          
          <DateRangePicker projects={this.state.projects} onStartChange={this.changeStartDate} onEndChange={this.changeEndDate} />

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
