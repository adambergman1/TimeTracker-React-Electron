import React, { Component } from 'react'
import AddTask from './AddTask'
import EditTask from './EditTask'
import Timer from './Timer'
import deleteIcon from '../images/delete.svg'
import titleIcon from '../images/title.svg'
import dateIcon from '../images/date.svg'
import timerIcon from '../images/timer.svg'
import editIcon from '../images/edit.svg'
import { Modal } from 'react-materialize'
import { findInLocalStorage, deleteItemFromArray, removeFromLocalStorage, saveToLocalStorage, addItemToArray } from '../../lib/crudHelpers'
import { getShortDate } from '../../lib/dateHelpers'

class Tasks extends Component {
    state = {
        project_id: this.props.project.projectId,
        tasks: [],
    }

    // Get all saved data in localStorage
    componentWillMount() {
      if (this.state.project_id && localStorage.hasOwnProperty('task')) {
        this.setState({ tasks: findInLocalStorage('task') })
      }
    }

    deleteTask = (id) => {
      const tasks = deleteItemFromArray(id, this.state.tasks)
      this.setState({ tasks })

      removeFromLocalStorage('task')
      saveToLocalStorage('task', tasks)
    }

    addTask = (task) => {
      const tasks = addItemToArray(task, this.state.tasks)
      this.setState({ tasks })
      saveToLocalStorage('task', tasks)
    }

    updateTimer = (timerDetails) => {
      if (timerDetails.elapsed) {
        const taskToUpdate = this.state.tasks.filter(task => task.id === timerDetails.id)[0]
  
        if (taskToUpdate) {
          taskToUpdate.elapsed = timerDetails.elapsed
          
          const allButUpdated = deleteItemFromArray(timerDetails.id, this.state.tasks)
          const tasks = addItemToArray(taskToUpdate, allButUpdated)
          
          this.setState({ tasks })
          removeFromLocalStorage('task')
          saveToLocalStorage('task', tasks)
        }
      }
    }

    editTask = editedTask => {
      const task = {
        id: editedTask.id,
        title: editedTask.title,
        parent: editedTask.parent,
        elapsed: editedTask.elapsed,
        created: editedTask.created,
      }
      console.log(task.elapsed)

      const tasksExceptEdited = deleteItemFromArray(editedTask.id, this.state.tasks)[0]

      const tasks = [task, tasksExceptEdited]
      this.setState({ tasks })

      removeFromLocalStorage('task')
      saveToLocalStorage('task', tasks)
    }

    render() {
    const { tasks, project_id } = this.state
    const filteredTasks = [...tasks.filter(task => task.parent === project_id)]

    let tasksToDisplay = filteredTasks.length ? (
      filteredTasks.map(task => {
        return (
          <div className="collection-item row" key={task.id}>
            <div className="col s5 task-title">
              <span>{task.title}</span>
            </div>
            <div className="col s3 task-created">
              {task.created.length ? getShortDate(task.created) : ''}
            </div>
            <div className="col s3 flex">
              <Timer onTimerUpdate={this.updateTimer} id={task.id} elapsed={task.elapsed} />
            </div>
            <div className='col s1 right'>
            <Modal trigger={<img src={editIcon} className='icon right' alt='Edit task' />}>
             <EditTask task={task} onEdit={this.editTask} tasks={this.state.tasks}></EditTask>

              <Modal trigger={<button className='btn red margin-top-20'>Delete</button>}>
              <p>Are you sure that you want to remove {task.title}?</p>
                <span className='btn red' onClick={() => { this.deleteTask(task.id) }}>Yes, delete</span>
              </Modal>

            </Modal>

            </div>
           </div>
        )
      })
    ) : <p className="center">Create your first task using the field above.</p>

    const tasksHasProject = this.state.project_id.length ? (
      <React.Fragment>
        <div className="col m6 padding-up-and-down left">
          <h4 className="task-header">{this.props.project.projectName}</h4>
        </div>
        <AddTask addTask={this.addTask} tasks={this.state.tasks} projectId={this.state.project_id} />
        
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
