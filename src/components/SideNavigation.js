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
      <Button className='btn-small green darken-2 absolute'>Projects</Button>
    }
    options={{ closeOnClick: true }}
  >
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
      onClick={() =>
        setState({
          selectedProject: null,
          isModalOpen: false,
          showProjects: true,
          showReports: null
        })
      }
    >
      All projects
    </Button>
  </SideNav>
)

export default SideNavigation
