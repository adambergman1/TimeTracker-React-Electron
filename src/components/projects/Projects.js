import React from 'react'
import deleteIcon from '../images/delete.svg'
import titleIcon from '../images/title.svg'
import moneyIcon from '../images/money.svg'
import { Modal } from 'react-materialize'

const Projects = ({ projects, deleteProject, selectedProject }) => {
  const projectList = projects.length ? (
    projects.map(project => {
      return (
        <div className='collection-item row' key={project.id}>

          <div className='project-name col s8'>
            <button className='link' onClick={() => selectedProject(project.name)}>{project.name}</button>
          </div>

          <div className='rate col s2'>
            <span>{project.rate}</span>
          </div>

          <div className='actions col s2'>
            <Modal trigger={<span className='right'><img src={deleteIcon} className='icon' alt='Delete project' /></span>}>
              <p>Are you sure that you want to remove this project? All tasks related to it will be removed.</p>
              <span className='btn red' onClick={() => { deleteProject(project) }}>DELETE</span>
            </Modal>

          </div>
        </div>
      )
    })
  ) : (
    <p className='center'>No projects yet.</p>
  )

  return (
    <div className='projects collection'>
      <div className='collection-heading row'>
        <div className='col s8'>
          <img src={titleIcon} alt='Name' className='icon' />
        </div>
        <div className='col s2'>
          <img src={moneyIcon} alt='Hourly rate' className='icon' />
        </div>
        <div className='col s2'>
          <img src={deleteIcon} alt='Remove' className='icon right' />
        </div>
      </div>
      {projectList}
    </div>
  )
}

export default Projects
