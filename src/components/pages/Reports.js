import React, { Component } from 'react'


export class Reports extends Component {
    state = {
        projects: []
    }

    componentWillMount() {
        if (localStorage.hasOwnProperty('task')) {
            const tasks = JSON.parse(localStorage.getItem('task'))
            this.setState({
            projects: tasks
            })
        }
    }


    getElapsedTime = (elapsed) => {
        const hours = String(Math.floor(elapsed / (1000 * 60 * 60)) % 24)
        const minutes = String(Math.floor(elapsed / 1000 / 60) + 100).substring(1)
        const seconds = String(Math.floor((elapsed % (1000 * 60)) / 1000) + 100).substring(1)

        const total = `${hours}:${minutes}:${seconds}`
        return total
    }

      render() {
        const { projects } = this.state

        let previousTaskParent = false
        let mappedTasks = []

        projects.map(task => {
            if (task.parent === previousTaskParent) {
                let lastItem = mappedTasks.pop()
                lastItem.tasks.push(task.elapsed)
                mappedTasks.push(lastItem)
            } else {
                let newEntry = {
                    project: task.parent,
                    tasks: [task.elapsed],
                    id: task.id
                }
                mappedTasks.push(newEntry)
            }
            previousTaskParent = task.parent
        })

        let tasksToDisplay = mappedTasks.length ? (
            mappedTasks.map(task => {
            return (
              <div className="collection-item" key={task.id}>
                <div className="project-title">
                  <span>{task.project}</span>
                </div>
                   <div className='total-time'>
                   <span>{this.getElapsedTime(task.tasks.reduce((a, b) => a + b))}</span>
                   </div>
               </div>
            )
          })
        ) : <p className="center">No tasks found.</p>
    
        return (
          <div className="container">
          <h1>Reports</h1>
            <div className="collection">
              {tasksToDisplay}
            </div>
    
          </div>
        )
      }
}

export default Reports
