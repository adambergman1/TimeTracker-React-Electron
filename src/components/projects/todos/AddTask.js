import React, { Component } from 'react'

class AddTask extends Component {
  state = {
    title: '',
    parent: ''
  }

  handleChange = e => {
    this.setState({
      title: e.target.value
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.addTask(this.state)
    this.setState({ title: '', parent: '' })
  }

  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" onChange={this.handleChange} value={this.state.title} placeholder="What are you working on?" />
      </form>
    )
  }
}

export default AddTask
