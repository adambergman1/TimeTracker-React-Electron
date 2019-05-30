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
})
