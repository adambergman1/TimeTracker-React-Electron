import React, { Component } from 'react'

class EditTask extends Component {
  state = {
    id: this.props.task.id,
    title: this.props.task.title,
    parent: this.props.task.parent,
    created: this.props.task.created,
    elapsed: this.props.task.elapsed,
    error: ''
  }

    handleChange = e => {
      this.setState({
        title: e.target.value
      })
    }

    handleSubmit = e => {
      e.preventDefault()
      
      if (!this.state.title) {
        this.setState({ error: 'The title cannot be empty.'})
      }

      const find = this.props.tasks.some(task => this.state.title === task.title)

      if (!find) {
        this.props.onEdit({
          id: this.state.id,
          title: this.state.title,
          parent: this.state.parent,
          created: this.state.created,
          elapsed: this.state.elapsed
        },
        this.setState({ success: 'Task has successfully been edited', error: '', msg: '' })
        )
      } else if (this.state.title === this.props.task.title) {
        this.setState({ msg: 'No changes has been made.', success: '', error: ''})
      } else {
        this.setState({ error: 'A task with the same name already exists. Please consider changing the name.', success: '', msg: '' })
      }
    }

  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        {this.state.error ? (<p className='error'>{this.state.error}</p>) : null}
        {this.state.success ? (<p className='success'>{this.state.success}</p>) : null}
        {this.state.msg ? (<p>{this.state.msg}</p>) : null}
        <input type='text' onChange={this.handleChange} placeholder={this.state.oldTitle} value={this.state.title} />
      </form>
    )
  }
}

export default EditTask
