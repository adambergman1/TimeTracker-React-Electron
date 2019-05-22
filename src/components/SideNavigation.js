import React from 'react'
import { SideNav, Modal, Button } from 'react-materialize'
import AddProject from './projects/AddProject'
import Projects from './projects/Projects'

const SideNavigation = ({
  addProject,
  state,
  setState,
  deleteProject,
  setSelectedProject,
  editProject
}) => (
  <SideNav
    trigger={
      <Button className='btn-small green darken-2'>Projects</Button>
    }
    options={{ closeOnClick: true }}
  >
    <Button
      className='btn btn-flat'
      onClick={() =>
        setState({
          selectedProject: null,
          isModalOpen: false,
          showProjects: true,
          showReports: null
        })
      }
    >All projects
    </Button>
    <Projects
      projects={state.projects}
      deleteProject={deleteProject}
      selectedProject={setSelectedProject}
      editProject={editProject}
    />
    <Modal trigger={<Button className='btn btn-small green darken-1'>+ Add new project</Button>}>
      <AddProject addProject={addProject} projects={state.projects} />
    </Modal>
  </SideNav>
)

export default SideNavigation
