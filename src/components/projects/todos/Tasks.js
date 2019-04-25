import React, { Component } from 'react'
import AddTask from './AddTask'
import deleteIcon from '../../images/delete.svg'
import { Modal } from 'react-materialize'
import Timer from './Timer'
import uuid from 'uuid'

class Tasks extends Component {
    state = {
        project_name: this.props.project,
        tasks: []
    }

    // Get all saved data in localStorage
    componentWillMount() {
      if (this.state.project_name && localStorage.hasOwnProperty('task')) {
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
      task.parent = this.state.project_name
      task.id = uuid()
      task.created = new Date().toString() // new Date(new Date().setDate(new Date().getDate() - 3)).toString()
      let tasks = [task, ...this.state.tasks]
      this.setState({ tasks })

      // Save the added task to localStorage together with the existing
      const allTasks = [task, ...this.state.tasks]
      localStorage.setItem('task', JSON.stringify(allTasks))
    }

    getData = (timerDetails) => {
      const filteredTask = this.state.tasks.filter(task => task.id === timerDetails.taskId)
      const allTasks = this.state.tasks.filter(task => task.id !== timerDetails.taskId)

      if (filteredTask.length && timerDetails.elapsed) {
        filteredTask[0].elapsed = timerDetails.elapsed
        const tasks = [filteredTask[0], ...allTasks]

        // Save the task with updated elapsed time to localStorage
        localStorage.removeItem('task')
        localStorage.setItem('task', JSON.stringify(tasks))
      }
    }

    render() {
      console.log('State from Tasks', this.state)
      const { tasks, project_name } = this.state
      const filteredTasks = [...tasks.filter(task => task.parent === project_name)]

    let tasksToDisplay = filteredTasks.length ? (
      filteredTasks.map(task => {
        return (
          <div className="collection-item" key={task.id}>
            <div className="task-title">
              <span>{task.title}</span>
            </div>
            <div className="info">{task.created.length ? task.created.slice(4, 15) : ''}</div>
               <div className='actions'>
                 <Timer onTimerUpdate={this.getData} taskId={task.id} elapsed={task.elapsed} />

                 <Modal trigger={<span className='remove-icon'><img src={deleteIcon} className='delete-icon' alt='Delete task' /></span>}>
                   <p>Are you sure that you want to remove this task?</p>
                   <span className='btn red' onClick={() => { this.deleteTask(task.id) }}>DELETE</span>
                 </Modal>
               </div>
           </div>
        )
      })
    ) : <p className="center">Create your first task using the field above.</p>

    const tasksHasProject = this.state.project_name.length ? (
      <React.Fragment>
      <h4>{this.state.project_name}</h4>
        <AddTask addTask={this.addTask} tasks={this.state.tasks} />
        
        <div className="collection">
          {tasksToDisplay}
        </div>
        
        </React.Fragment>
    ) : ('')

    return (
      <div className="container">
        {tasksHasProject}
      </div>
    )
  }
}


export default Tasks
