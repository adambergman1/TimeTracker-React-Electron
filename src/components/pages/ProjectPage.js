import React from 'react'
import { Modal, Button } from 'react-materialize'
import AddProject from '../projects/AddProject'
import Projects from '../projects/Projects'

const ProjectPage = ({ addProject, state, showModal, deleteProject, setSelectedProject, editProject }) => (
  <React.Fragment>
    <div className='section red darken-3'>
      <div className='container home'>
        <div className='row'>
          <div className='col s12'>
            <h4 className='page-title center-align'>Projects</h4>
          </div>
        </div>
      </div>
    </div>
    <div className='section'>
      <div className='container home'>
        <div className='row center'>
          <Modal
            open={state.isModalOpen}
            trigger={
              <Button onClick={showModal} className='btn-small green darken-1'>
                + Add project
              </Button>
            }
          >
            <AddProject addProject={addProject} projects={state.projects} />
          </Modal>
        </div>
        <div className='row'>
          <div className='col s12'>
            <Projects
              projects={state.projects}
              deleteProject={deleteProject}
              selectedProject={setSelectedProject}
              editProject={editProject}
            />
          </div>
        </div>
      </div>
    </div>
  </React.Fragment>
)

export default ProjectPage
