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
        this.setState({ name: '', rate: '', id: '',  error: null }))
    } else {
      this.setState({ error: 'A project with the same name already exists'})
    }
  }

  hideMessage = () => {
    this.setState({ error: null })
  }

  render () {
    const { error } = this.state

    const message = error ? (
        <div className="col s12 right-align">
          <span className={error && 'error' }>{error && error}</span>
          <button className="btn-flat" onClick={this.hideMessage}><img src={deleteIcon} alt="Close"/></button>
        </div>

    ) : ''
    return (
      <React.Fragment>
        {message}
      <form onSubmit={this.handleSubmit}>
        <label>Add new project:</label>
        <input type="text" onChange={this.handleChange} value={this.state.name} placeholder="The name of your project" minLength="1" required />
        <input type="number" onChange={this.handleRateChange} value={this.state.rate} placeholder="Hourly rate (if any)"
        min="0" max="9999999" />
        <button className="btn green modal-close">Add Project</button>
      </form>
      </React.Fragment>
    )
  }
}

export default AddProject
