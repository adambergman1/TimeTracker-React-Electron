import React, { Component } from 'react'
import { getElapsedTime, convertPrettyTimeToMS } from '../../lib/dateHelpers'

class EditTask extends Component {
  state = {
    id: this.props.task.id,
    title: this.props.task.title,
    parent: this.props.task.parent,
    created: this.props.task.created,
    start: this.props.task.start,
    end: this.props.task.end,
    diff: getElapsedTime(this.props.task.diff) || '00:00:00'
  }

  handleChange = e => {
    this.setState({ title: e.target.value })
  }

  handleTimeChange = e => {
    this.setState({ diff: e.target.value })
  }

  handleSubmit = e => {
    e.preventDefault()
    const otherTaskWithSameName = this.props.tasks.some(task => this.state.title === task.title)
    const nameNotChanged = this.state.title === this.props.task.title

    const task = {...this.state}
    task.diff = convertPrettyTimeToMS(this.state.diff)

    if (!this.state.title) {
      this.setState({ error: 'The title cannot be empty.' })
    } else if (!otherTaskWithSameName || (nameNotChanged && this.state.diff)) {
      this.props.onEdit({ task: task })
      this.setState({ success: 'Task has successfully been edited', error: '', msg: '' })
    } else if (this.state.title === this.props.task.title) {
      this.setState({ msg: 'No changes has been made.', success: '', error: '' })
    } else {
      this.setState({ error: 'A task with the same name already exists. Please consider changing the name.', success: '', msg: '' })
    }
  }

  render() {
    const { error, success, msg, title, oldTitle, diff } = this.state
    return (
      <form onSubmit={this.handleSubmit}>
        {error && <p className='error'>{error}</p>}
        {success && <p className='success'>{success}</p>}
        {msg && <p>{msg}</p>}

        <input
          type='text'
          onChange={this.handleChange}
          placeholder={oldTitle}
          value={title}
        />
        <input
          type='time'
          onChange={this.handleTimeChange}
          step='1'
          value={diff}
          placeholder='00:00:00'
        />

        <button className='btn'>Confirm</button>
      </form>
    )
  }
}

export default EditTask
