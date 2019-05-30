import React, { Component } from 'react'
import { Modal } from 'react-materialize'
import EditTask from './EditTask'
import Timer from './Timer'
import { getShortDate } from '../../lib/dateHelpers'
import editIcon from '../images/edit.svg'


export class Task extends Component {
  state = {
    isModalClicked: false,
    taskToEdit: null,
  }

  render() {
    const { task, tasks, preventEdit, onEdit, deleteTask, updateTask, onManualUpdate } = this.props
    const { taskToEdit, isModalClicked } = this.state

    return (
      <div className='collection-item valign-wrapper' key={task.id}>
        <div className='col s1 left-align'>
          {preventEdit !== task.id && (
            <Modal
              trigger={<img src={editIcon} className='icon edit-icon' alt='Edit task' />}
              options={{
                onOpenStart: () =>
                  this.setState({ isModalClicked: true, taskToEdit: task.id }),
                onCloseStart: () =>
                  this.setState({ isModalClicked: false, taskToEdit: null })
              }}>
              {isModalClicked && taskToEdit === task.id && (
                  <EditTask task={task} tasks={tasks} onEdit={onEdit} />
                )}

              <Modal
                trigger={<button className='btn btn-small red top-right'>Delete</button>}>
                <p>Are you sure that you want to remove {task.title}?</p>
                <span className='btn red' onClick={ () => {deleteTask(task.id)} }>Yes, delete</span>
              </Modal>
            </Modal>
          )}
        </div>
        <div className='col s7 task-title'>
          <span>{task.title}</span>
          <span className='task-created'>
            {task.created.length ? getShortDate(task.created) : ''}
          </span>
        </div>
        <div className='col s4 valign-wrapper flex-end'>
          <Timer
            updateTask={updateTask}
            task={task}
            onManualUpdate={onManualUpdate}
          />
        </div>
      </div>
    )
  }
}

export default Task
