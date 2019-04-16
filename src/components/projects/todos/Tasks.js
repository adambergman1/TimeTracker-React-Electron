import React, { Component } from 'react'
import AddTask from './AddTask'

class Tasks extends Component {
    state = {
        project_name: this.props.match.params.project_name,
        tasks: [
            {id: 1, title: 'Learn C#', parent: '1dv024'},
            {id: 2, title: 'Learn OOP', parent: '1dv024'},
            {id: 3, title: 'Learn Int', parent: '1dv024'},
            {id: 4, title: 'Learn Double', parent: '1dv024'},
            {id: 5, title: 'Learn Methods', parent: '1dv024'},
            {id: 6, title: 'Learn Classes', parent: '1dv024'},
            {id: 7, title: 'Learn React', parent: '1dv430'}
        ]
    }

    deleteTask = (id) => {
        const tasks = this.state.tasks.filter(task => {
          return task.id !== id
        })
        this.setState({ tasks })
      }

    addTask = (task) => {
      task.id = Math.random()
      task.parent = this.state.project_name
      console.log(task)
      let tasks = [...this.state.tasks, task]
      this.setState({ tasks })
    }

    render() {
    const { tasks, project_name } = this.state

    let taskList = tasks.length ? (
      tasks.map(task => {
        if (task.parent === project_name) {
          return (
            <div className="collection-item" key={task.id}>
              <span>{task.title}</span>
              <span className='remove-icon' onClick={() => { this.deleteTask(task.id) }}>x</span>
          </div>
          )
        }
      })
    ) : (
    <p className="center">Start a new timer by adding a task above</p>
    )

    return (
      <div className="container">
      <h4>{this.state.project_name}</h4>

        <AddTask addTask={this.addTask} />

        <div className="collection">
          {taskList}
        </div>

      </div>
    )
  }
}

export default Tasks
