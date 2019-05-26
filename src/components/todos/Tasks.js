import React, { Component } from 'react'
import AddTask from './AddTask'
import { findInLocalStorage, deleteItemFromArray, removeFromLocalStorage, saveToLocalStorage, addItemToArray, findItemInArray } from '../../lib/crudHelpers'
import Task from './Task';

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
    const { tasks, project_id, preventEdit, updateTimer } = this.state
    const filteredTasks = [...tasks.filter(task => task.parent === project_id)]

    const tasksToDisplay = filteredTasks.length ? (
      filteredTasks.map(task => {
        return (
          <Task 
            key={task.id}
            task={task}
            tasks={tasks}
            preventEdit={preventEdit} 
            onManualUpdate={updateTimer}
            updateTask={this.updateTaskFromTimer} 
            onEdit={this.editTask}
            deleteTask={this.deleteTask}
          />
        )
      })
    ) : (
      <p className='center'>Create your first task using the field above.</p>
    )

    return (
      <React.Fragment>
        <AddTask addTask={this.addTask} tasks={tasks} projectId={project_id} />
        <div className='col s12 collection'>
          {tasksToDisplay}
        </div>
      </React.Fragment>
    )
  }
}

export default Tasks
