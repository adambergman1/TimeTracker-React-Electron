import React, { Component } from 'react'

class AddTask extends Component {
  state = {
    id: '',
    title: '',
    parent: '',
    elapsed: 0,
    created: '',
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
      console.log(this.state.title)
      this.props.addTask({
        id: this.state.id,
        title: this.state.title,
        parent: this.state.title,
        elapsed: this.state.elapsed,
        created: this.state.created
      })
      this.setState({ id: '', title: '', parent: '', error: '' })
    } else {
      this.setState({ error: 'A task with the same name already exists. Please change the name of your new task.' })
    }
  }

  render () {
    return (
      <form onSubmit={this.handleSubmit}>
      {this.state.error ? (<p className="error">{this.state.error}</p>) : null}
        <input type="text" onChange={this.handleChange} value={this.state.title} placeholder="What are you working on?" />
      </form>
    )
  }
}

export default AddTask
