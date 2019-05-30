import React, { Component } from 'react'
import uuid from 'uuid'
import deleteIcon from '../images/delete.svg'


class AddTask extends Component {
  state = {
    id: '',
    title: '',
    parent: '',
    start: null,
    end: null,
    diff: null,
    created: ''
  }

  componentWillUnmount () {
    this.setState({ error: null })
  }

  handleChange = e => {
    this.setState({ title: e.target.value })
  }

  handleSubmit = e => {
    e.preventDefault()
    const findTaskByName = this.props.tasks.some(task => this.state.title === task.title)

    if (!findTaskByName) {
        this.props.addTask({
          id: uuid(),
          title: this.state.title,
          parent: this.props.projectId,
          start: null,
          end: null,
          diff: null,
          created: new Date().toString()
        })
      this.setState({ id: '', title: '', parent: '', created: '', error: null })
    } else {
      this.setState({ error: 'The name must be unique. Please change the it.' })
    }
  }

  hideMessage = () => {
    this.setState({ error: null })
  }

  render () {
    const { error } = this.state
    
    const message = error ? (
      <div className="col s12 right-align">
        <span className={error && 'error'}>{error && error}</span>
        <button className="btn-flat" onClick={this.hideMessage}><img src={deleteIcon} alt="Close"/></button>
      </div>
      ) : ''

    return (
      <React.Fragment>
      {message}
      <form className="col s12" onSubmit={this.handleSubmit}>
        <input type="text" onChange={this.handleChange} value={this.state.title} placeholder="What are you working on?" minLength="1" required />
      </form>
      </React.Fragment>
    )
  }
}

export default AddTask
