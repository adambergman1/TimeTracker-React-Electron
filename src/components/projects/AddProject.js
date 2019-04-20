import React, { Component } from 'react'

class AddProject extends Component {
  state = {
    name: '',
    rate: ''
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
    this.props.addProject(this.state)
    this.setState({ name: '', rate: '' })
  }

  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>Add new project:</label>
        <input type="text" onChange={this.handleChange} value={this.state.name} placeholder="The name of your project" />
        <input type="number" onChange={this.handleRateChange} value={this.state.rate} placeholder="Hourly rate (if any)"
        min="1" max="5000" />
        <button className="btn">Add Project</button>
      </form>
    )
  }
}

export default AddProject
