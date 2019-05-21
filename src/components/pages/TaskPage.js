import React from 'react'
import { SideNav, Modal, Button } from 'react-materialize'
import Tasks from '../todos/Tasks'
import AddProject from '../projects/AddProject'
import Projects from '../projects/Projects'

export default ({ addProject, state, deleteProject, editProject, setState, setSelectedProject }) =>
  <React.Fragment>
    <div className='section red darken-3'>
      <div className='container'>
        <div className='row'>
          <div className='absolute'>
            <SideNav trigger={<Button className='btn-small green darken-2'>All projects</Button>} options={{ closeOnClick: true }}>
              <Modal trigger={<Button>+ Add new project</Button>}>
                <AddProject addProject={addProject} projects={state.projects} />
              </Modal>
              <Projects
                projects={state.projects}
                deleteProject={deleteProject}
                selectedProject={setSelectedProject}
                editProject={editProject}
              />
              <Button
                className='btn grey waves-effect'
                onClick={() => setState({ selectedProject: '', isModalOpen: false, showProjects: true })}>All projects</Button>
            </SideNav>
          </div>
          <div className='col s12'>
            <h4 className='page-title center-align'>{state.selectedProject.projectName}</h4>
          </div>
        </div>
      </div>
    </div>
    <div className='section'>
      <div className='container'>
        <div className='row'>
          <Tasks project={state.selectedProject} />
        </div>
      </div>
    </div>
  </React.Fragment>
