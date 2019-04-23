import React, { Component } from 'react'

class AddProject extends Component {
  state = {
    name: '',
    rate: '',
    error: ''
  }

  handleChange = e => {
    this.setState({
      name: e.target.value
    })
  }

  handleRateChange = e => {
    this.setState({
      rate: e.target.value
    })
  }

  handleSubmit = e => {
    e.preventDefault()

    const find = this.props.projects.some(name => this.state.name === name.name)
    if (!find) {
      this.props.addProject({
        name: this.state.name,
        rate: this.state.rate
      })
      this.setState({ name: '', rate: '', error: '' })
    } else {
      this.setState({ error: 'A project with the same name already exists' })
    }

  }

  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>Add new project:</label>
        {this.state.error ? (<p className="error">{this.state.error}</p>) : null}
        <input type="text" onChange={this.handleChange} value={this.state.name} placeholder="The name of your project" />
        <input type="number" onChange={this.handleRateChange} value={this.state.rate} placeholder="Hourly rate (if any)"
        min="0" max="5000" />
        <button className="btn">Add Project</button>
      </form>
    )
  }
}

export default AddProject
