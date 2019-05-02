import React, { Component } from 'react'
import uuid from 'uuid'


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
    const findProjectByName = this.props.projects.some(name => this.state.name === name.name)
    
    if (!findProjectByName) {
      this.props.addProject({ name: this.state.name, rate: this.state.rate, id: uuid() },
        this.setState({ name: '', rate: '', errorMessage: '', id: '' })
        )
      this.showTempMessage('Project successfully added')
    } else {
      this.setState({ errorMessage: 'A project with the same name already exists'})
    }
  }

  showTempMessage = (msg) => {
    this.setState({message: msg})
    setTimeout(() => this.setState({message: ''}), 2500)
  }

  

  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>Add new project:</label>
        
        {this.state.errorMessage && <span className='error'>{this.state.errorMessage}</span>}
          {this.state.message && <span className='success'>{this.state.message}</span>}

        <input type="text" onChange={this.handleChange} value={this.state.name} placeholder="The name of your project" minLength="1" required />
        <input type="number" onChange={this.handleRateChange} value={this.state.rate} placeholder="Hourly rate (if any)"
        min="0" max="9999999" />
        <button className="btn">Add Project</button>
      </form>
    )
  }
}

export default AddProject
