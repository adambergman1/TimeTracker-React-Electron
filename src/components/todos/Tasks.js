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
import { findInLocalStorage, deleteItemFromArray, removeFromLocalStorage, saveToLocalStorage, addItemToArray, findItemInArray } from '../../lib/crudHelpers'
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

      const edited = findItemInArray(editedTask.id, this.state.tasks)[0]
      
      if (edited.elapsed !== editedTask.elapsed) {
        this.setState({manualTimerUpdate: editedTask}, () => 
        this.setState({ manualTimerUpdate: null})
        )
      }
  
      const tasksExceptEdited = deleteItemFromArray(editedTask.id, this.state.tasks)
      const tasks = addItemToArray(task, tasksExceptEdited)

      this.setState({ tasks })

      removeFromLocalStorage('task')
      saveToLocalStorage('task', tasks)
    }

    render() {
    const { tasks, project_id, manualTimerUpdate } = this.state
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
            
            {manualTimerUpdate && manualTimerUpdate.id === task.id ? 
              <Timer onTimerUpdate={this.updateTimer} id={task.id} elapsed={task.elapsed} onManualUpdate={manualTimerUpdate} /> :
              <Timer onTimerUpdate={this.updateTimer} id={task.id} elapsed={task.elapsed} /> 
            }
            </div>
            <div className='col s1 right'>
            
            <Modal trigger={<img src={editIcon} className='icon right' alt='Edit task' />}
            options={ 
              {onOpenStart: () => this.setState({modalIsClicked: true, taskToEdit: task.id }), 
              onCloseStart: () => this.setState({modalIsClicked: null, taskToEdit: null})} 
              } >

              {this.state.modalIsClicked && this.state.taskToEdit === task.id &&
              <EditTask task={task} onEdit={this.editTask} tasks={this.state.tasks}></EditTask>
              }

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

    const renderTasks = this.state.project_id.length ? (
      <React.Fragment>
        <div className="col m6 padding-up-and-down left">
          <h4 className="task-header">{this.props.project.projectName}</h4>
        </div>
        <AddTask addTask={this.addTask} tasks={this.state.tasks} projectId={this.state.project_id} />
        
        <div className="col s12 collection">
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
        {renderTasks}
      </React.Fragment>
    )
  }
}


export default Tasks
