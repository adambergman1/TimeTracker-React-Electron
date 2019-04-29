import React from 'react'
import titleIcon from '../images/title.svg'
import moneyIcon from '../images/money.svg'
import editIcon from '../images/edit.svg'
import arrowRightIcon from '../images/arrow-right.svg'
import { Modal } from 'react-materialize'
import EditProject from './EditProject'

const Projects = ({ projects, deleteProject, selectedProject, editProject }) => {
  const projectList = projects.length ? (
    projects.map(project => {
      return (
        <div className='collection-item row' key={project.id}>

          <div className='project-name col s8'>
            <button className='link' onClick={() => selectedProject(project.name, project.id)}><img src={arrowRightIcon} className='icon' alt='View project' /> {project.name}</button>
          </div>

          <div className='rate col s2'>
            <span>{project.rate}</span>
          </div>

          <div className='actions col s2 right-align'>
            <Modal trigger={<img src={editIcon} onClick={() => { editProject(project) }} className='icon' alt='Edit project' />}>
              <EditProject project={project} onEdit={editProject} projects={projects} />

              <Modal trigger={<button className='btn red margin-top-20'>Delete</button>}>
                <p>Are you sure that you want to remove this project? All tasks related to it will be removed.</p>
                <span className='btn red' onClick={() => { deleteProject(project) }}>DELETE</span>
              </Modal>

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
          <img src={editIcon} alt='Edit' className='icon right' />
        </div>
      </div>
      {projectList}
    </div>
  )
}

export default Projects
