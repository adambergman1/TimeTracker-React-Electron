import React from 'react'
import { Link } from 'react-router-dom'

const Projects = ({ projects, deleteProject }) => {
  const projectList = projects.length ? (
    projects.map(project => {
      return (
        <div className='collection-item' key={project.id}>
          <Link to={'/' + project.name}>
            <span>{project.name}</span>
          </Link>
          <span className='remove-icon' onClick={() => { deleteProject(project.id) }}>x</span>
        </div>
      )
    })
  ) : (
    <p className='center'>You have no projects yet</p>
  )

  return (
    <div className='projects collection'>
      {projectList}
    </div>
  )
}

export default Projects
