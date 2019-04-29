import React, { Component } from 'react'

class EditProject extends Component {
  state = {
    name: this.props.project.name,
    rate: this.props.project.rate,
    id: this.props.project.id,
    error: '',
    success: ''
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

    const find = this.props.projects.some(project => this.state.name === project.name)
    const nothingChanged = this.state.name === this.props.project.name && this.state.rate === this.props.project.rate

    if (nothingChanged) {
      this.setState({ msg: 'No changes made.', success: '', error: '' })
    } else if (!this.state.name) {
      this.setState({ error: 'Project name cannot be empty.', success: '', msg: ''})
    } else if (!find || this.state.name === this.props.project.name) {
      this.props.onEdit({
        name: this.state.name,
        rate: this.state.rate,
        id: this.state.id
      })
      this.setState({ success: 'Project has successfully been edited', error: '', msg: '' })
    } else {
      this.setState({ success: '', error: 'A project with the same name already exists. Pick another name.', msg: '' })
    }
  }

  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>Edit project:</label>
        {this.state.error ? (<p className="error">{this.state.error}</p>) : null}
        {this.state.success ? (<p className="success">{this.state.success}</p>) : null}
        {this.state.msg ? (<p>{this.state.msg}</p>) : null}
        
        <input type="text" onChange={this.handleChange} value={this.state.name} placeholder={this.state.name} />
        <input type="number" onChange={this.handleRateChange} value={this.state.rate} placeholder={this.state.rate}
        min="0" max="5000" />
        <button className="btn">Confirm</button>
      </form>
    )
  }
}

export default EditProject
