/* eslint-env jest */

import React from 'react'
// import toJson from 'enzyme-to-json'
import { shallow } from 'enzyme'

import Task from './Task'

describe('<Task />', () => {
  it('Displays the task title based on props.task.title ', () => {
    const mockTask = {
      created: Date.now(),
      diff: null,
      end: null,
      id: '123',
      parent: '999',
      start: null,
      title: 'This is the task title'
    }
    const task = shallow(
      <Task
        task={mockTask}
        preventEdit={null}
        onManualUpdate={null}
        updateTask={() => null}
        onEdit={() => null}
        deleteTask={() => null}
      />
    )
    expect(task.find('.task-title').text()).toBe('This is the task title')

    task.setProps({ task: { title: 'Hello', created: Date.now() } })

    expect(task.find('.task-title').text()).toBe('Hello')
  })
  it('Calls props.deleteTask on delete button click', () => {
    const deleteTaskSpy = jest.fn()
    const mockTask = {
      created: Date.now(),
      title: 'Test item',
      id: '123',
      parent: '999',
      start: null,
      diff: null
    }
    const task = shallow(
      <Task
        task={mockTask}
        preventEdit={null}
        onManualUpdate={null}
        updateTask={() => null}
        onEdit={() => null}
        deleteTask={deleteTaskSpy}
      />
    )
    task.find('.btn.red').simulate('click')
    expect(deleteTaskSpy).toHaveBeenCalled()
  })
})
