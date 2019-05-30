/* eslint-env jest */

import React from 'react'
import { shallow } from 'enzyme'

import AddProject from './AddProject'

describe('<AddProject />', () => {
  it('handles input change on state', () => {
    const newProject = shallow(<AddProject addProject={null} projects={null} />)

    newProject.find('input[type="text"]').simulate('change', {
      target: { value: 'Adding a project name' }
    })

    expect(newProject.state().name).toBe('Adding a project name')
  })
  it('calls props addProject on submit', () => {
    const projectsArray = [{ id: 0, name: '0', rate: '0' }, { id: 1, name: '1', rate: '0' }]
    const addProject = jest.fn()
    const newProject = shallow(<AddProject addProject={addProject} projects={projectsArray} />)

    newProject.find('input[type="text"]').simulate('change', { target: { value: 'Adding a project name' } })
    newProject.find('form').simulate('submit', { preventDefault () {} })

    expect(addProject).toHaveBeenCalled()
  })
  it('clears the state on submit', () => {
    const projectsArray = [{ id: 0, name: '0', rate: '0' }, { id: 1, name: '1', rate: '0' }]
    const newProject = shallow(<AddProject projects={projectsArray} addProject={() => {}} />)

    newProject.find('input[type="text"]').simulate('change', { target: { value: 'Changing title' } })
    newProject.find('form').simulate('submit', { preventDefault () {} })

    expect(newProject.state().name).toBe('')
  })
  it('calls preventDefault on submit', () => {
    const preventDefault = jest.fn()
    const projectsArray = [{ id: 0, name: '0', rate: '0' }, { id: 1, name: '1', rate: '0' }]
    const newProject = shallow(<AddProject projects={projectsArray} addProject={() => {}} />)

    newProject.find('input[type="text"]').simulate('change', { target: { value: 'Changing title ' } })
    newProject.find('form').simulate('submit', { preventDefault })

    expect(preventDefault).toHaveBeenCalled()
  })
})
