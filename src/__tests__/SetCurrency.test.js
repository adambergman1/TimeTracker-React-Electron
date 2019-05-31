/* eslint-env jest */

import React from 'react'
import { shallow } from 'enzyme'

import SetCurrency from '../components/projects/SetCurrency'

describe('<SetCurrency />', () => {
  it('state.currencies should include 118 currencies', () => {
    const currency = shallow(<SetCurrency onCurrencyUpdate={null} />)

    expect(currency.state().currencies).toHaveLength(118)
  })
  it('should display the selected currency', () => {
    const selectedCurrency = { symbol: '₱', name: 'Philippine Peso', code: 'PHP' }
    const currency = shallow(<SetCurrency onCurrencyUpdate={null} />)

    currency.setState({ selectedCurrency: selectedCurrency })

    expect(currency.find('.selected-currency').text()).toBe('Selected currency: Philippine Peso')
  })
  it('should clear state.selectedCurrency when clicking reset btn', () => {
    const currency = shallow(<SetCurrency onCurrencyUpdate={() => {}} />)
    currency.find('.btn-flat').simulate('click')
    expect(currency.state().selectedCurrency).toBe('')
  })
})
