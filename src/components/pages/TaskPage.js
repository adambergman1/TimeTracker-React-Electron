import React from 'react'
import Tasks from '../todos/Tasks'

export default ({ selectedProject, children }) => (
  <React.Fragment>
    <div className='section red darken-3'>
      <div className='container'>
        <div className='row'>
          <div className='absolute'>
            {children}
          </div>
          <div className='col s12'>
            <h4 className='page-title center-align'>
              {selectedProject.projectName}
            </h4>
          </div>
        </div>
      </div>
    </div>
    <div className='section'>
      <div className='container'>
        <div className='row'>
          <Tasks project={selectedProject} />
        </div>
      </div>
    </div>
  </React.Fragment>
)
