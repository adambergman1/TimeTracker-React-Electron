/* eslint-env jest */

import React from 'react'
import { shallow } from 'enzyme'

import EditProject from './EditProject'

describe('<EditProject />', () => {
  it('sets the initial state from given props', () => {
    const project = { name: 'Hello', id: '123', rate: '1249' }
    const editProject = shallow(<EditProject project={project} onEdit={() => {}} projects={null} />)

    expect(editProject.state().name).toBe('Hello')
    expect(editProject.state().id).toBe('123')
    expect(editProject.state().rate).toBe('1249')
  })
  it('handles input change on state', () => {
    const project = { name: 'Hello', id: '123', rate: '1249' }
    const editProject = shallow(<EditProject project={project} onEdit={() => {}} projects={null} />)

    editProject.find('input[type="text"]').simulate('change', {
      target: { value: 'Changing the project name' }
    })
    editProject.find('input[type="number"]').simulate('change', {
      target: { value: '700' }
    })

    expect(editProject.state().name).toBe('Changing the project name')
    expect(editProject.state().rate).toBe('700')
  })
  it('should display an error message on submit if the name field is empty', () => {
    const project = { name: 'Hello', id: '123', rate: '1249' }
    const projectsArray = [{ id: 0, name: '0', rate: '0' }, { id: 1, name: '1', rate: '0' }]
    const editProject = shallow(<EditProject project={project} onEdit={() => {}} projects={projectsArray} />)

    editProject.find('input[type="text"]').simulate('change', { target: { value: '' } })
    editProject.find('form').simulate('submit', { preventDefault () {} })

    expect(editProject.state().error).toBe('Project name cannot be empty.')
  })
  it('should display an error message on submit if the name is not unique', () => {
    const project = { name: 'Hello', id: '123', rate: '1249' }
    const projectsArray = [{ id: 0, name: 'First', rate: '0' }, { id: 1, name: 'Second', rate: '0' }]
    const editProject = shallow(<EditProject project={project} onEdit={() => {}} projects={projectsArray} />)

    editProject.find('input[type="text"]').simulate('change', { target: { value: 'First' } })
    editProject.find('form').simulate('submit', { preventDefault () {} })

    expect(editProject.state().error).toBe('A project with the same name already exists. Pick another name.')
  })
  it('should only display one message at a time', () => {
    const projectsArray = [{ id: 0, name: 'First', rate: '0' }, { id: 1, name: 'Second', rate: '0' }]
    const project = { name: 'Hello', id: '123', rate: '1249' }
    const editProject = shallow(<EditProject project={project} onEdit={() => {}} projects={projectsArray} />)

    editProject.find('input[type="text"]').simulate('change', { target: { value: 'First' } })
    editProject.find('form').simulate('submit', { preventDefault () {} })

    expect(editProject.state().error).toBeDefined()
    expect(editProject.state().msg).toBe(null)
    expect(editProject.state().success).toBe(null)
  })
  it('calls props onEdit on submit', () => {
    const projectsArray = [{ id: '0', name: '0', rate: '0' }, { id: 1, name: '1', rate: '0' }]
    const project = { id: '123', name: 'Editing the title', rate: '250' }
    const onEdit = jest.fn()
    const editProject = shallow(<EditProject onEdit={onEdit} projects={projectsArray} project={project} />)

    editProject.find('input[type="text"]').simulate('change', { target: { value: 'Adding a project name' } })
    editProject.find('form').simulate('submit', { preventDefault () {} })

    expect(onEdit).toHaveBeenCalledWith({ 'id': '123', 'name': 'Adding a project name', 'rate': '250' })
  })
})
