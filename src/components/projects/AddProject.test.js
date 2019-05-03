/* eslint-env jest */

import { addProject } from '../pages/Home'

const startState = {
  projects: [
    { name: 'Editing project title', rate: '500', id: '4977649d-2fe4-49b4-922b-737d034f5e41' }
  ]
}

const newProject = { name: 'New project', rate: '1000', id: '123-123' }

describe('Add Project', () => {
  test('Should update the state with the added project')
})
