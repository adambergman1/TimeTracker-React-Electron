import React, { Component } from 'react'
import { getElapsedTime } from '../../lib/dateHelpers'
import PlayButton from './PlayButton'

class Timer extends Component {
  state = {
    isStart: false,
    start: null,
    end: null,
    timer: null,
    elapsed: 0,
    diff: 0,
  }

  async componentWillMount() {
    const task = this.props.task
    const { start, end, diff } = task

    await this.setSavedValues(start, end, diff)

    if (start && !end) this.startTimer()
  }

  componentWillUnmount() {
    clearInterval(this.state.timer)
    this.setState({ timer: null })
  }

  componentWillReceiveProps () {
    const { onManualUpdate, task } = this.props
    if (onManualUpdate && onManualUpdate.id === task.id) {
      this.setState({ 
        diff: onManualUpdate.diff, 
        elapsed: Date.now() - new Date() + onManualUpdate.diff 
      })
    }
  }

  setSavedValues = (start, end, diff) => {
    if (start) this.setState({ start: new Date(start), elapsed: Date.now() - new Date(start) })
    if (end) this.setState({ end: new Date(end) })
    if (diff) this.setState({ diff })

    if (diff && start) {
      this.setState({ start: new Date(start) + diff, elapsed: Date.now() - new Date(start) + diff })
    } else if (diff && !start) {
      this.setState({ elapsed: Date.now() - new Date() + diff })
    }
  }

  tick = () => {
    if (this.state.diff === 0 || this.state.diff === null) { 
      this.setState({ elapsed: Date.now() - this.state.start })
    } else {
      this.setState({ elapsed: Date.now() - new Date(this.state.start) + this.state.diff })
    }
  }

  startTimer = () => {
    let timer = setInterval(this.tick, 1000)
    this.setState({
      isStart: true,
      timer: timer,
      end: null
    })

    const task = this.props.task

    if (!this.state.start) {
      this.setState({ start: new Date() })
      task.start = new Date()
    } else {
      task.start = this.state.start
    }
    task.end = null
    this.props.updateTask({ task })
  }

  stopTimer = () => {
    clearInterval(this.state.timer)
    this.setState({
      isStart: false,
      timer: null,
      end: new Date(),
      diff: this.state.elapsed,
      start: null
    })
    const task = this.props.task
    task.start = null
    task.end = new Date()
    task.diff = this.state.elapsed
    this.props.updateTask({ task })
  }

  onClick = () => {
    if (!this.state.isStart) {
      this.startTimer()
    } else {
      this.stopTimer()
    }
  }

  render() {
    const { isStart, elapsed } = this.state
    return (
      <React.Fragment>
        <span className={isStart ? 'elapsed-time counting' : 'elapsed-time'}>
          {getElapsedTime(elapsed)}
        </span>
        <PlayButton isStart={isStart} onClick={this.onClick} />
      </React.Fragment>
    )
  }
}

export default Timer
