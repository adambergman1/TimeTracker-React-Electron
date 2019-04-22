import React, { Component } from 'react'
import startIcon from '../../images/start.svg'
import pauseIcon from '../../images/stop.svg'

class Timer extends Component {
  state = {
    isStart: false,
    timer: null,
    elapsed: 0,
    diff: 0
  }

  componentDidMount () {
    const savedElapsed = JSON.parse(localStorage.getItem('task'))
    const savedTimerInfo = savedElapsed.filter(task => task.id === this.props.taskId)

    if (savedTimerInfo) {
      this.setState({ elapsed: savedTimerInfo[0].elapsed, diff: savedTimerInfo[0].elapsed })
    }
  }

  componentWillUnmount () { // clear timer
    clearInterval(this.state.timer)

    this.props.onTimerUpdate({
      elapsed: this.state.elapsed,
      taskId: this.props.taskId,
    })
    
    this.setState({timer: null, diff: 0, elapsed: 0})
  }

  tick = () => {
    let elapsed = Date.now() - this.state.start + this.state.diff
    this.setState({ elapsed })
  }

  getElapsedTime = (elapsed) => {
    const hours = String(Math.floor(elapsed / (1000 * 60 * 60)) % 24)
    const minutes = String(Math.floor(elapsed / 1000 / 60) + 100).substring(1)
    const seconds = String(Math.floor((elapsed % (1000 * 60)) / 1000) + 100).substring(1)

    const total = `${hours}:${minutes}:${seconds}`
    return total
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
        taskId: this.props.taskId,
      })
      this.setState({
        isStart: false,
        timer: null,
        diff: this.state.elapsed
      })
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
    return (
      <div className="timer">
        <span className="elapsed-time">{this.getElapsedTime(this.state.elapsed)}</span>

        <span className="toggle-timer" onClick={this.onClick}>
            {this.state.isStart ? (
              <img src={pauseIcon} alt="Pause timer"/>
            ) : (
              <img src={startIcon} alt="Start timer"/>
            )
            }
          </span>
          {/* <button className="btn red" onClick={this.resetTimer}>Reset</button> */}
      </div>
    )
  }
}

export default Timer
