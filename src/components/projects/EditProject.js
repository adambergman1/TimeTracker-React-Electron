import React, { Component } from 'react'

class EditProject extends Component {
  state = {
    name: this.props.project.name,
    rate: this.props.project.rate,
    id: this.props.project.id
  }

  handleChange = e => {
    this.setState({ name: e.target.value })
  }

  handleRateChange = e => {
    this.setState({ rate: e.target.value })
  }

  handleSubmit = e => {
    e.preventDefault()

    const findProjectByName = this.props.projects.some(project => this.state.name === project.name)
    const nothingChanged = this.state.name === this.props.project.name && this.state.rate === this.props.project.rate

    if (nothingChanged) {
      this.setState({ msg: 'No changes made.', success: null, error: null })
    } else if (!this.state.name) {
      this.setState({ error: 'Project name cannot be empty.', success: null, msg: null})
    } else if (!findProjectByName || this.state.name === this.props.project.name) {
      this.props.onEdit({ name: this.state.name, rate: this.state.rate, id: this.state.id })
      this.setState({ error: null, msg: null, success: 'Project has successfully been edited' })    
    } else {
      this.setState({ success: null, error: 'A project with the same name already exists. Pick another name.', msg: null })
    }
  }

  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>Edit project:</label>
        {this.state.error && <p className='error'>{this.state.error}</p>}
        {this.state.success && <p className='success'>{this.state.success}</p>}
        {this.state.msg && <p>{this.state.msg}</p>}
        
        <input type="text" onChange={this.handleChange} value={this.state.name} placeholder={this.state.name} />
        <input type="number" onChange={this.handleRateChange} value={this.state.rate} placeholder={ this.state.rate ? this.state.rate : 'Rate' }
        min="0" max="5000" />
        <button className="btn">Confirm</button>
      </form>
    )
  }
}

export default EditProject
