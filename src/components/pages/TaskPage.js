import React from 'react'
import Tasks from '../todos/Tasks'

export default ({ selectedProject, children, timerIsRunning }) => (
  <React.Fragment>
    <div className='section red darken-3'>
      <div className='container'>
        <div className='row valign-wrapper'>
          {children}
          <h4 className='page-title' style={{ marginLeft: '15px' }}>
            {selectedProject.projectName}
          </h4>
        </div>
      </div>
    </div>
    <div className='section'>
      <div className='container'>
        <div className='row'>
          <Tasks timerIsRunning={timerIsRunning} project={selectedProject} />
        </div>
      </div>
    </div>
  </React.Fragment>
)
