import React, { Component } from 'react'
import startIcon from '../../images/play.svg'
import pauseIcon from '../../images/stop.svg'
import getElapsedTime from '../../Reports/getElapsedTime'

class Timer extends Component {
  state = {
    isStart: false,
    timer: null,
    elapsed: 0,
    diff: 0
  }

  componentDidMount () {
    const savedElapsed = JSON.parse(localStorage.getItem('task'))
    const savedTimerInfo = savedElapsed.filter(task => task.id === this.props.taskId)[0]

    if (savedTimerInfo) {
      this.setState({ elapsed: savedTimerInfo.elapsed, diff: savedTimerInfo.elapsed })
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
      <React.Fragment>
        <div className={this.state.isStart ? "elapsed-time counting" : "elapsed-time"}>{getElapsedTime(this.state.elapsed)}</div>

        <div className="toggle-timer" onClick={this.onClick}>
            {this.state.isStart ? (
              <img src={pauseIcon} alt="Pause timer" className="icon"/>
            ) : (
              <img src={startIcon} alt="Start timer" className="icon"/>
            )
            }
          </div>
          {/* <button className="btn red" onClick={this.resetTimer}>Reset</button> */}
        </React.Fragment>
    )
  }
}

export default Timer
