/* eslint-env jest */

import React from 'react'
import { shallow } from 'enzyme'

import App from '../App'

describe('<App />', () => {
  it('renders without crashing', () => {
    shallow(<App />)
  })
  it('should only display projects on initial state', () => {
    const app = shallow(<App />)
    app.find('.page-title').text()

    expect(app.state().showProjects).toBeTruthy()
    expect(app.state().showReports).toBeFalsy()
    expect(app.state().selectedProject).toBeFalsy()
  })
})
