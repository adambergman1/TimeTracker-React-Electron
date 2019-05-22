import React, { Component } from 'react'
import startIcon from '../images/play.svg'
import pauseIcon from '../images/stop.svg'
import { findInLocalStorage, findItemInArray } from '../../lib/crudHelpers'
import { getElapsedTime } from '../../lib/dateHelpers'

class Timer extends Component {
  state = {
    isStart: false,
    timer: null,
    elapsed: 0,
    diff: 0
  }

  componentDidMount () {
    const tasksInStorage = findInLocalStorage('task')
    const savedTimerInfo = findItemInArray(this.props.id, tasksInStorage)[0]

    if (savedTimerInfo) {
      this.setState({ elapsed: savedTimerInfo.elapsed, diff: savedTimerInfo.elapsed })
    }
  }

  componentWillUnmount () { // clear timer
    clearInterval(this.state.timer)

    this.props.onTimerUpdate({
      elapsed: this.state.elapsed,
      id: this.props.id,
    },
    this.setState({timer: null, diff: 0, elapsed: 0})
    )
  }

  componentWillReceiveProps () {
    if (this.props.onManualUpdate) {
      this.setState({
        elapsed: this.props.onManualUpdate.elapsed, 
        diff: this.props.onManualUpdate.elapsed
      })
    }
  }

  tick = () => {
    let elapsed = Date.now() - this.state.start + this.state.diff
    this.setState({ elapsed })
  }

  onClick = () => {
    if(!this.state.isStart) { // Start timer
      let timer = setInterval(this.tick, 1000)
        this.setState({
          isStart: true,
          timer,
          start: new Date(),
        })
    } else { // Stop/pause timer
      clearInterval(this.state.timer)
      this.props.onTimerUpdate({
        elapsed: this.state.elapsed,
        id: this.props.id,
      },
      this.setState({
        isStart: false,
        timer: null,
        diff: this.state.elapsed
      })
      )
    }
  }

  resetTimer = () => {
    clearInterval(this.state.timer)
    this.setState({
      isStart: false,
      timer: null,
      elapsed: 0,
      diff: 0
    })
  }

  render () {
    const { isStart } = this.state
    return (
      <React.Fragment>
        <span className={isStart ? 'elapsed-time counting' : 'elapsed-time'}>{getElapsedTime(this.state.elapsed)}</span>
        <img 
        onClick={this.onClick} 
        src={isStart ? pauseIcon : startIcon} 
        alt={isStart ? 'Pause timer' : 'Start timer'} 
        className="icon timer-icon"
        />

        {/* <button className="btn red" onClick={this.resetTimer}>Reset</button> */}
      </React.Fragment>
    )
  }
}

export default Timer
