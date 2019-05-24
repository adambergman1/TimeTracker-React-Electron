import React, { Component } from 'react'
import AddTask from './AddTask'
import EditTask from './EditTask'
import Timer from './Timer'
import editIcon from '../images/edit.svg'
import { Modal } from 'react-materialize'
import { findInLocalStorage, deleteItemFromArray, removeFromLocalStorage, saveToLocalStorage, addItemToArray, findItemInArray } from '../../lib/crudHelpers'
import { getShortDate } from '../../lib/dateHelpers'

class Tasks extends Component {
  state = {
    project_id: this.props.project.projectId,
    tasks: []
  }

  // Get all saved data in localStorage
  componentWillMount() {
    if (this.state.project_id && localStorage.hasOwnProperty('task')) {
      this.setState({ tasks: findInLocalStorage('task') })
    }
  }

  deleteTask = id => {
    const tasks = deleteItemFromArray(id, this.state.tasks)
    this.setState({ tasks })

    removeFromLocalStorage('task')
    saveToLocalStorage('task', tasks)
  }

  addTask = task => {
    const tasks = addItemToArray(task, this.state.tasks)
    this.setState({ tasks })
    saveToLocalStorage('task', tasks)
  }

  editTask = ({ task }) => {
     this.updateTimer(task)
    const tasksExceptEdited = deleteItemFromArray(task.id, this.state.tasks)
    const tasks = addItemToArray(task, tasksExceptEdited)

    this.setState({ tasks })

    removeFromLocalStorage('task')
    saveToLocalStorage('task', tasks)
  }

  updateTimer = (task) => {
    const edited = findItemInArray(task.id, this.state.tasks)[0]

    if (edited.diff !== task.diff) {
      this.setState({ updateTimer: { diff: task.diff, id: task.id }}, () => 
      this.setState({ updateTimer: null }))
    }
  }

  updateTaskFromTimer = ({ task }) => {
    if (!task.end) this.setState({ preventEdit: task.id })
    if (task.end) this.setState({ preventEdit: null })
    const allButEdited = deleteItemFromArray(task.id, this.state.tasks)
    const tasks = addItemToArray(task, allButEdited)

    this.setState({ tasks })
    removeFromLocalStorage('task')
    saveToLocalStorage('task', tasks)
  }

  render() {
    const { tasks, project_id, updateTimer, preventEdit } = this.state
    const filteredTasks = [...tasks.filter(task => task.parent === project_id)]

    const tasksToDisplay = filteredTasks.length ? (
      filteredTasks.map(task => {
        return (
          <div className='collection-item valign-wrapper' key={task.id}>
            <div className='col s1 left-align'>
              {preventEdit !== task.id &&
              <Modal trigger={<img src={editIcon} className='icon edit-icon' alt='Edit task' />} 
                options={{
                  onOpenStart: () => this.setState({ isModalClicked: true, taskToEdit: task.id}),
                  onCloseStart: () => this.setState({ isModalClicked: null, taskToEdit: null })
                }}
              >
                {this.state.isModalClicked && this.state.taskToEdit === task.id &&
                 <EditTask task={task} tasks={tasks} onEdit={this.editTask} /> 
                }

                <Modal trigger={ <button className='btn btn-small red top-right'>Delete</button>}>
                  <p>Are you sure that you want to remove {task.title}?</p>
                  <span className='btn red' onClick={() => { this.deleteTask(task.id)}}>Yes, delete</span>
                </Modal>
              </Modal>
              }
            </div>
            <div className='col s7 task-title'>
              <span>{task.title}</span>
              <span className='task-created'>
                {task.created.length ? getShortDate(task.created) : ''}
              </span>
            </div>
            <div className='col s4 valign-wrapper flex-end'>
            <Timer updateTask={this.updateTaskFromTimer} task={task} onManualUpdate={updateTimer}/>
            </div>
          </div>
        )
      })
    ) : (
      <p className='center'>Create your first task using the field above.</p>
    )

    return project_id.length ? (
      <React.Fragment>
        <AddTask addTask={this.addTask} tasks={tasks} projectId={project_id} />
        <div className='col s12 collection'>{tasksToDisplay}</div>
      </React.Fragment>
    ) : (
      ''
    )
  }
}

export default Tasks
