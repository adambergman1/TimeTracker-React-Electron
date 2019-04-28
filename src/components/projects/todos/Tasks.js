import React, { Component } from 'react'
import AddTask from './AddTask'
import EditTask from './EditTask'
import deleteIcon from '../../images/delete.svg'
import titleIcon from '../../images/title.svg'
import dateIcon from '../../images/date.svg'
import timerIcon from '../../images/timer.svg'
import editIcon from '../../images/edit.svg'
import { Modal, Collapsible, CollapsibleItem } from 'react-materialize'
import Timer from './Timer'
import uuid from 'uuid'

class Tasks extends Component {
    state = {
        project_name: this.props.project,
        tasks: [],
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

    getShortDate = date => {
      const d = new Date(date)
      const dateOfMonth = d.getUTCDate()
      const monthOfYear = d.getUTCMonth()
      const year = d.getUTCFullYear()
      return dateOfMonth + '/' + monthOfYear + '/' + year
    }

    editTask = editedTask => {
      const taskToEdit = this.state.tasks.filter(task => task.title === editedTask.oldTitle)[0].id
      this.deleteTask(taskToEdit)

      console.log(editedTask)

      let task = {
        id: editedTask.id,
        title: editedTask.newTitle,
        parent: editedTask.parent,
        elapsed: editedTask.elapsed,
        created: editedTask.created,
      }

      const allTasks = this.state.tasks.filter(task => task.id !== editedTask.id)

      let tasks = [task, ...allTasks]
      console.log(tasks)
      this.setState({ tasks })

      localStorage.setItem('task', JSON.stringify(tasks))
    }

    render() {
    const { tasks, project_name } = this.state
    const filteredTasks = [...tasks.filter(task => task.parent === project_name)]

    let tasksToDisplay = filteredTasks.length ? (
      filteredTasks.map(task => {
        return (
          <div className="collection-item row" key={task.id}>
            <div className="col s5 task-title">
              <span>{task.title}</span>
            </div>
            <div className="col s3 task-created">
              {task.created.length ? this.getShortDate(task.created) : ''}
            </div>
            <div className="col s3 flex">
              <Timer onTimerUpdate={this.getData} taskId={task.id} elapsed={task.elapsed} />
            </div>
            <div className='col s1 right'>

           <Modal trigger={<img src={editIcon} className='icon' alt='Edit task' />}>
            <Collapsible>
            <CollapsibleItem header={<span className='btn' onClick={() => this.setState({taskToEdit: task})}>Edit title</span>}>
              {this.state.taskToEdit ? <EditTask task={this.state.taskToEdit} onEdit={this.editTask} tasks={this.state.tasks}></EditTask> : ''}
            </CollapsibleItem>
            <CollapsibleItem header={<span className='btn red right'>Delete</span>}>
              <p>Are you sure that you want to remove {task.title}?</p>
              <span className='btn red' onClick={() => { this.deleteTask(task.id) }}>Yes, delete</span>
            </CollapsibleItem>
            </Collapsible>

            </Modal>

              {/* <Modal trigger={<span className='right'><img src={deleteIcon} className='icon' alt='Delete task' /></span>}>
                <p>Are you sure that you want to remove this task?</p>
                <span className='btn red' onClick={() => { this.deleteTask(task.id) }}>DELETE</span>
              </Modal> */}
            </div>
           </div>
        )
      })
    ) : <p className="center">Create your first task using the field above.</p>

    const tasksHasProject = this.state.project_name.length ? (
      <React.Fragment>
        <div className="col m6 padding-up-and-down left">
          <h4 className="task-header">{this.state.project_name}</h4>
        </div>
        <AddTask addTask={this.addTask} tasks={this.state.tasks} />
        
        <div className="collection">
          <div className="collection-heading row">
          <div className='col s5'>
            <img src={titleIcon} alt='Name' className='icon' />
          </div>
          <div className='col s3'>
            <img src={dateIcon} alt='Date' className='icon' />
          </div>
          <div className='col s3'>
            <img src={timerIcon} alt='Timer' className='icon' />
          </div>
          <div className='col s1'>
            <img src={deleteIcon} alt='Remove' className='icon right' />
          </div>
        </div>

          {tasksToDisplay}
        </div>
        
        </React.Fragment>
    ) : ('')

    return (
      <React.Fragment>
        {tasksHasProject}
      </React.Fragment>
    )
  }
}


export default Tasks
