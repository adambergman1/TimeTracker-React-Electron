/* eslint-env jest */

import React from 'react'
import { shallow } from 'enzyme'

import AddTask from './AddTask'

describe('<AddTask />', () => {
  it('handles input change on state', () => {
    const newTask = shallow(<AddTask submit={() => null} />)

    newTask.find('input').simulate('change', {
      target: { value: 'Changing the title' }
    })

    expect(newTask.state().title).toBe('Changing the title')
  })
  it('calls props addTask on submit', () => {
    const tasksArray = [
      { id: 0, title: '0' },
      { id: 1, title: '1' }
    ]
    const addTask = jest.fn()
    const newTask = shallow(<AddTask tasks={tasksArray} addTask={addTask} />)

    newTask.find('input').simulate('change', { target: { value: 'Changing title' } })
    newTask.find('form').simulate('submit', { preventDefault () {} })

    expect(addTask).toHaveBeenCalled()
  })
  it('clears the state on submit', () => {
    const tasksArray = [
      { id: 0, title: '0' },
      { id: 1, title: '1' }
    ]
    const newTask = shallow(<AddTask tasks={tasksArray} addTask={() => {}} />)

    newTask.find('input').simulate('change', { target: { value: 'Changing title' } })
    newTask.find('form').simulate('submit', { preventDefault () { } })

    expect(newTask.state().title).toBe('')
  })
})
