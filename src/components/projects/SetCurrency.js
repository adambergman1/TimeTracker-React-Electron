import React, { Component } from 'react'
import { Select, Modal, Button } from 'react-materialize'
import currencyList from '../../lib/currencies.js'
import { findInLocalStorage, saveToLocalStorage, removeFromLocalStorage } from '../../lib/crudHelpers'

class SetCurrency extends Component {
  state = {
    selectedCurrency: '',
    currencies: currencyList
  }

  componentDidMount() {
    if (localStorage.hasOwnProperty('currency')) {
      this.setState({ selectedCurrency: findInLocalStorage('currency') })
    }
    this.setState({ isModalOpen: true })
  }

  componentWillUnmount() {
    this.setState({ isModalOpen: false })
  }

  updateCurrency = e => {
    this.setState({ selectedCurrency: e.target.value })
    saveToLocalStorage('currency', e.target.value)
    this.props.onCurrencyUpdate({ selectedCurrency: e.target.value })
  }

  resetCurrency = () => {
    if (localStorage.hasOwnProperty('currency')) {
      removeFromLocalStorage('currency')
    }
    this.setState({ selectedCurrency: '' })
    this.props.onCurrencyUpdate({ selectedCurrency: '' })
  }

  render() {
    const { currencies } = this.state
    const currenciesToRender =
      currencies.length >= 1
        ? currencies.map(c => (
            <option key={c.code} value={c.code}>
              {c.code}
            </option>
          ))
        : ''
    return (
      <div className='container'>
        <div className='row center'>
          <div className='col s12'>
            <Modal open={this.state.isModalOpen}>
              <Select onChange={this.updateCurrency}>
                <option value='none'>Select currency</option>
                {currenciesToRender}
              </Select>
              <Button onClick={this.resetCurrency}>Reset</Button>
            </Modal>
          </div>
        </div>
      </div>
    )
  }
}

export default SetCurrency
