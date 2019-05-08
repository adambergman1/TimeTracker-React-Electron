import React, { Component } from 'react'
import uuid from 'uuid'
import deleteIcon from '../images/delete.svg'


class AddProject extends Component {
  state = {
    name: '',
    rate: '',
    id: ''
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
    
    if (!findProjectByName) {
      this.props.addProject({ name: this.state.name, rate: this.state.rate, id: uuid() },
        this.setState({ name: '', rate: '', id: '',  error: null, success: 'Project has successfully been added' }))
    } else {
      this.setState({ success: null, error: 'A project with the same name already exists'})
    }
  }

  hideMessage = () => {
    this.setState({ error: null, success: null })
  }

  render () {
    return (
      <React.Fragment>
        {this.state.error || this.state.success ? 
        <div className="col s12 right-align">
          <span className={this.state.error ? 'error' : this.state.success ? 'success' : ''}
          >{this.state.error ? this.state.error : this.state.success ? this.state.success : ''}</span>

          <button className="btn-flat" onClick={this.hideMessage}><img src={deleteIcon} alt="Close"/></button>
        </div>
        : ''}

      <form onSubmit={this.handleSubmit}>
        <label>Add new project:</label>
        <input type="text" onChange={this.handleChange} value={this.state.name} placeholder="The name of your project" minLength="1" required />
        <input type="number" onChange={this.handleRateChange} value={this.state.rate} placeholder="Hourly rate (if any)"
        min="0" max="9999999" />
        <button className="btn">Add Project</button>
      </form>
      </React.Fragment>
    )
  }
}

export default AddProject
