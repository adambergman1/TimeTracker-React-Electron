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
        key={mockTask.id}
        task={mockTask}
        tasks={null}
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
})
