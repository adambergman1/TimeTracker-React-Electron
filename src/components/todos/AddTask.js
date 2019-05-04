import React, { Component } from 'react'
import uuid from 'uuid'


class AddTask extends Component {
  state = {
    id: '',
    title: '',
    parent: '',
    elapsed: 0,
    created: ''
  }

  handleChange = e => {
    this.setState({ title: e.target.value })
  }

  handleSubmit = e => {
    e.preventDefault()
    const findTaskByName = this.props.tasks.some(task => this.state.title === task.title)

    if (!findTaskByName) {
      this.props.addTask({
        id: uuid(),
        title: this.state.title,
        parent: this.props.projectId,
        elapsed: this.state.elapsed,
        created: new Date().toString()
      })
      this.setState({ id: '', title: '', parent: '', created: '', elapsed: 0, error: '' })
      this.showTempMessage('Project successfully added')
    } else {
      this.setState({ error: 'A task with the same name already exists. Please change the name of your new task.' })
    }
  }

  showTempMessage = (msg) => {
    this.setState({success: msg})
    setTimeout(() => this.setState({success: ''}), 2500)
  }

  render () {
    return (
      <form onSubmit={this.handleSubmit}>
      {this.state.error && <span className='error'>{this.state.error}</span>}
      {this.state.success && <span className='success'>{this.state.success}</span>}
      
        <input type="text" onChange={this.handleChange} value={this.state.title} placeholder="What are you working on?" minLength="1" required />
      </form>
    )
  }
}

export default AddTask
