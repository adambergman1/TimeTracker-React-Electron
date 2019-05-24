import React from 'react'
import startIcon from '../images/play.svg'
import pauseIcon from '../images/stop.svg'

const PlayButton = ({ isStart, onClick }) =>
  <React.Fragment>
    <img
      onClick={onClick}
      src={isStart ? pauseIcon : startIcon}
      alt={isStart ? 'Pause timer' : 'Start timer'}
      className='icon timer-icon'
    />
  </React.Fragment>

export default PlayButton
