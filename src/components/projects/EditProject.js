import React, { Component } from 'react'

class EditProject extends Component {
  state = {
    name: this.props.project.name,
    rate: this.props.project.rate,
    id: this.props.project.id,
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
      this.props.onEdit({
        name: this.state.name,
        rate: this.state.rate,
        id: this.state.id
      })
      this.setState({ name: '', rate: '', id: '', error: '' })
    } else {
      this.setState({ error: 'A project with the same name already exists' })
    }
  }

  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>Edit project:</label>
        {this.state.error ? (<p className="error">{this.state.error}</p>) : null}
        <input type="text" onChange={this.handleChange} value={this.state.name} placeholder={this.state.name} />
        <input type="number" onChange={this.handleRateChange} value={this.state.rate} placeholder={this.state.rate}
        min="0" max="5000" />
        <button className="btn">Confirm</button>
      </form>
    )
  }
}

export default EditProject
