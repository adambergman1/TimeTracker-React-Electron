// import React from 'react'
// import { Link } from 'react-router-dom'
// import deleteIcon from '../images/delete.svg'
// import { Modal } from 'react-materialize'

// const Projects = ({ projects, deleteProject }) => {
//   const projectList = projects.length ? (
//     projects.map(project => {
//       return (
//         <div className='collection-item' key={project.id}>
//           <Link className='project-title' to={'/' + project.name}>
//             <span>{project.name}</span>
//           </Link>
//           <span onClick={() => console.log('Hej')}>{project.name}</span>

//           <div className='rate'>
//             <span>{project.rate}</span>
//           </div>

//           <div className='actions'>
//             <Modal trigger={<span className='remove-icon'><img src={deleteIcon} className='delete-icon' alt='Delete project' /></span>}>
//               <p>Are you sure that you want to remove this project? All tasks related to it will be removed.</p>
//               <span className='btn red' onClick={() => { deleteProject(project) }}>DELETE</span>
//             </Modal>

//           </div>
//         </div>
//       )
//     })
//   ) : (
//     <p className='center'>No projects yet.</p>
//   )

//   return (
//     <div className='projects collection'>
//       {projectList}
//     </div>
//   )
// }

// export default Projects

import React, { Component } from 'react'
import deleteIcon from '../images/delete.svg'
import removeIcon from '../images/remove.svg'
import listIcon from '../images/list.svg'
import moneyIcon from '../images/money.svg'
import { Modal } from 'react-materialize'

class Projects extends Component {
  state = {
    projects: this.props.projects,
    deleteProject: this.props.deleteProject
  }

  render () {
    const { projects, deleteProject } = this.state

    const projectList = projects.length ? (
      projects.map(project => {
        return (
          <div className='collection-item' key={project.id}>

            <div className="project-name">
              <button className="link" onClick={() => this.props.selectedProject(project.name)}>{project.name}</button>
            </div>

            <div className='rate'>
              <span>{project.rate}</span>
            </div>

            <div className='actions'>
              <Modal trigger={<span className='remove-icon'><img src={deleteIcon} className='delete-icon' alt='Delete project' /></span>}>
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
        <div className="collection-heading">
          <img src={listIcon} alt="Name" className="icon" />
          <img src={moneyIcon} alt="Hourly rate" className="icon" />
          <img src={removeIcon} alt="Remove" className="icon" />
        </div>
        {projectList}
      </div>
    )
  }
}

export default Projects
