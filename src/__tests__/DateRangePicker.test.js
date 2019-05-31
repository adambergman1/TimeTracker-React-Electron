/* eslint-env jest */

import React from 'react'
import { shallow } from 'enzyme'

import DateRangePicker from '../components/reports/DateRangePicker'

describe('<DateRangePicker />', () => {
  it('should set starting date to 30 days back', () => {
    const datePicker = shallow(<DateRangePicker projects={null} onStartChange={null} onEndChange={null} />)
    const date = new Date(new Date().setDate(new Date().getDate() - 30)).setHours(0, 0, 0, 0)

    expect(datePicker.state().startDate).toBe(date)
  })
  it('should set end date to todays date', () => {
    const datePicker = shallow(<DateRangePicker projects={null} onStartChange={null} onEndChange={null} />)
    const date = new Date().setHours(0, 0, 0, 0)

    expect(datePicker.state().endDate).toBe(date)
  })
  it('should update state.startDate on change', () => {
    const datePicker = shallow(<DateRangePicker projects={null} onStartChange={() => {}} onEndChange={null} />)
    const newDate = new Date(new Date().setDate(new Date().getDate() - 1)).setHours(0, 0, 0, 0)
    const testDate = new Date(new Date().setHours(0, 0, 0, 0))

    datePicker.find('.start-date')
      .simulate('change', newDate)

    expect(datePicker.state().startDate).toBe(newDate)
    expect(datePicker.state().startDate).not.toBe(testDate)
  })
  it('should call props.onStartChange on change', () => {
    const onStartChange = jest.fn()
    const datePicker = shallow(<DateRangePicker projects={null} onStartChange={onStartChange} onEndChange={null} />)
    const newDate = new Date(new Date().setDate(new Date().getDate() - 1)).setHours(0, 0, 0, 0)

    datePicker.find('.start-date')
      .simulate('change', newDate)

    expect(onStartChange).toHaveBeenCalled()
  })
})
