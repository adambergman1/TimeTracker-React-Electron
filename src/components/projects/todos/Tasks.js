import React, { Component } from 'react'
import AddTask from './AddTask'
import deleteIcon from '../../images/delete.svg'
import startIcon from '../../images/start.svg'
import { Modal } from 'react-materialize'

class Tasks extends Component {
    state = {
        project_name: this.props.match.params.project_name,
        tasks: []
    }

    // Get all saved data in localStorage
    componentWillMount() {
      if (localStorage.hasOwnProperty('task')) {
        const tasks = JSON.parse(localStorage.getItem('task'))
        this.setState({ tasks })
      }
    }

    deleteTask = (id) => {
        const tasks = this.state.tasks.filter(task => {
          return task.id !== id
        })
        this.setState({ tasks })

        const dataInStorage = JSON.parse(localStorage.getItem('task'))
        const filteredItem = [...dataInStorage.filter(task => task.id !== id)]
        localStorage.removeItem('task')
        localStorage.setItem('task', JSON.stringify(filteredItem))
      }

    addTask = (task) => {
      task.id = Math.random()
      task.parent = this.state.project_name
      let tasks = [task, ...this.state.tasks]
      this.setState({ tasks })

      // Save the added task to localStorage together with the existing
      const allTasks = [task, ...this.state.tasks]
      localStorage.setItem('task', JSON.stringify(allTasks))
    }

    render() {
    const { tasks, project_name } = this.state

    const filteredTasks = [...tasks.filter(task => task.parent === project_name)]

    let currentTasks = filteredTasks.length ? (
      filteredTasks.map(task => {
        return (
          <div className="collection-item" key={task.id}>
               <span>{task.title}</span>

               <div className='actions'>
                 <Modal trigger={<span className='remove-icon'><img src={deleteIcon} className='delete-icon' alt='Delete task' /></span>}>
                   <p>Are you sure that you want to remove this task?</p>
                   <span className='btn red' onClick={() => { this.deleteTask(task.id) }}>DELETE</span>
                 </Modal>
                 <div className="timer">
                 <span className="start-timer" onClick={this.startTimer}><img src={startIcon} alt="Start timer" className="start-icon"/></span>
                 </div>
               </div>
           </div>
        )
      })
    ) : <p className="center">Create your first task using the field above!</p>

    return (
      <div className="container">
      <h4>{this.state.project_name}</h4>

        <AddTask addTask={this.addTask} />

        <div className="collection">
          {currentTasks}
        </div>

      </div>
    )
  }
}

export default Tasks
