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
      this.setState({ msg: 'No changes made.', success: '', error: '' })
    } else if (!this.state.name) {
      this.setState({ errorMessage: 'Project name cannot be empty.', success: '', msg: ''})

    } else if (!findProjectByName || this.state.name === this.props.project.name) {
      this.props.onEdit({ name: this.state.name, rate: this.state.rate, id: this.state.id })
      this.setState({ errorMessage: '', msg: '' })
      this.showTempMessage('Project has successfully been edited')
    
    } else {
      this.setState({ success: '', errorMessage: 'A project with the same name already exists. Pick another name.', msg: '' })
    }
  }

  showTempMessage = (msg) => {
    this.setState({success: msg})
    setTimeout(() => this.setState({success: ''}), 2500)
  }

  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>Edit project:</label>
        {this.state.errorMessage && <p className='error'>{this.state.errorMessage}</p>}
        {this.state.success && <p className='success'>{this.state.success}</p>}
        {this.state.msg && <p>{this.state.msg}</p>}
        
        <input type="text" onChange={this.handleChange} value={this.state.name} placeholder={this.state.name} />
        <input type="number" onChange={this.handleRateChange} value={this.state.rate} placeholder={this.state.rate}
        min="0" max="5000" />
        <button className="btn">Confirm</button>
      </form>
    )
  }
}

export default EditProject
