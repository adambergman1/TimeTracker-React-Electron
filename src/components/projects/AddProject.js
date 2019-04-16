import React, { Component } from 'react'

class AddProject extends Component {
  state = {
    name: ''
  }

  handleChange = e => {
    this.setState({
      name: e.target.value
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.addProject(this.state)
    this.setState({ name: '' })
  }

  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>Add new project:</label>
        <input type="text" onChange={this.handleChange} value={this.state.name} placeholder="The name of your project" />
      </form>
    )
  }
}

export default AddProject
