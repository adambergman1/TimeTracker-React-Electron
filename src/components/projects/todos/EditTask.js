import React, { Component } from 'react'

class EditTask extends Component {
  state = {
    id: this.props.task.id,
    oldTitle: this.props.task.title,
    parent: this.props.task.parent,
    created: this.props.task.created,
    elapsed: this.props.task.elapsed,
    newTitle: '',
    error: ''
  }

    handleChange = e => {
      this.setState({
        newTitle: e.target.value
      })
    }

    handleSubmit = e => {
      e.preventDefault()
      
      if (!this.state.newTitle) {
        this.setState({ error: 'The title cannot be empty.'})
      }

      const find = this.props.tasks.some(task => this.state.newTitle === task.title)

      if (!find) {
        this.props.onEdit({
          id: this.state.id,
          newTitle: this.state.newTitle,
          oldTitle: this.state.oldTitle,
          parent: this.state.parent,
          created: this.state.created,
          elapsed: this.state.elapsed
        },
        this.setState({ id: '', oldTitle: '', newTitle: '', parent: '', created: '', elapsed: '', error: '' })
        )
      } else {
        this.setState({ error: 'A task with the same name already exists. Please change the name of your new task.' })
      }
    }

  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        {this.state.error ? (<p className='error'>{this.state.error}</p>) : null}
        <input type='text' onChange={this.handleChange} placeholder={this.state.oldTitle} />
      </form>
    )
  }
}

export default EditTask
