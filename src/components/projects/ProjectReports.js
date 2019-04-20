import React from 'react'
import { Link } from 'react-router-dom'

const Projects = ({ projects, deleteProject }) => {
  const projectList = projects.length ? (
    projects.map(project => {
      console.log(project)
      return (
        <div className='collection-item' key={project.id}>
          <span>{project.name}</span>

          <div className='rate'>
            <span>{project.rate}</span>
          </div>

          <div className='actions' />
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
