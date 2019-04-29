import React, { Component } from 'react'
import DateRangePicker from '../Reports/DateRangePicker'
import getElapsedTime from '../Reports/getElapsedTime'

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
                    if (project.id === task.parent) project.tasks.push(task)
                })
            })
            this.setState({ projects: savedProjects })
        }
    }

    changeStartDate = (start) => {
      this.setState({ startDate: new Date(start.start) })
    }

    changeEndDate = (end) => {
      this.setState({ endDate: new Date(end.end) })
    }

    withoutTime = (date) => {
      return new Date(date).setHours(0, 0, 0, 0)
    }

    calculateCost = (rate, elapsed) => {
      const elapsedTime = elapsed.filter(time => time !== 0)
      const sum = elapsedTime.length > 1 ? elapsedTime.reduce((a, b) => a + b) : elapsedTime

      return ((rate / 3600) * (parseInt(sum / 1000))).toFixed(2)
    }

      render() {
        const { projects, startDate, endDate } = this.state

        let projectsToDisplay = projects.length ? (
            projects.map(project => {
              let elapsed = []
              project.tasks.forEach(task => {
                if (project.id === task.parent) {
                  if (this.withoutTime(task.created) >= this.withoutTime(startDate) && 
                  this.withoutTime(task.created) <= this.withoutTime(endDate)) {
                    elapsed.push(task.elapsed)
                  }
                }
              })
            return (
              <div className="collection-item row" key={project.id}>
                <div className="project-title col s5">
                  <span>{project.name}</span>
                </div>
                <div className="hourly-rate col s2">
                    <span>{project.rate}</span>
                </div>
                   <div className='total-time col s2'>
                   <span>{project.tasks.length ? elapsed.length ? (getElapsedTime(elapsed.reduce((a, b) => a + b))) : '0:00:00' : '0:00:00'}</span>
                   </div>
                <div className="col s3 right-align">
                  {project.rate.length ? <span>{this.calculateCost(project.rate, elapsed)}</span> : ''}
                </div>
               </div>
            )
          })
        ) : <p className="center">No tasks found.</p>
    
        return (
          <div className="container">

          <div className="padding-up-and-down">
            <h4>Reports</h4>
          </div>
          
          <DateRangePicker projects={this.state.projects} onStartChange={this.changeStartDate} onEndChange={this.changeEndDate} />

          <div className="collection-heading row">
            <div className="name col s5"><span>Name</span></div>
            <div className="hourly-rate col s2"><span>Hourly rate</span></div>
            <div className="total-time col s2"><span>Total time</span></div>
            <div className="earned-money col s3 right-align"><span>$</span></div>
          </div>
          
            <div className="collection">
              {projectsToDisplay}
            </div>
          </div>
        )
      }
}

export default Reports
