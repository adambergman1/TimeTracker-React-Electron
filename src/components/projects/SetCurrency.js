import React, { Component } from 'react'
import { Select, Modal, Button } from 'react-materialize'
import currencyList from '../../lib/currencies.js'
import { findInLocalStorage, saveToLocalStorage } from '../../lib/crudHelpers'

class SetCurrency extends Component {
  state = {
    selectedCurrency: '',
    currencies: currencyList
  }

  componentDidMount () {
    if (localStorage.hasOwnProperty('currency')) {
      this.setState({ selectedCurrency: findInLocalStorage('currency') })
    }
  }

  updateCurrency = e => {
    this.setState({ selectedCurrency: e.target.value })
    saveToLocalStorage('currency', e.target.value)
  }

  render() {
    const { currencies, selectedCurrency } = this.state
    const currenciesToRender =
      currencies.length >= 1
        ? currencies.map(c => (
            <option key={c.code} value={c.code}>
              {c.code}
            </option>
          ))
        : ''
    return (
      <React.Fragment>
        <p>Currency: {selectedCurrency && selectedCurrency}</p>
        <Modal trigger={<Button className="btn-flat">Change currency</Button>}>
          <Select onChange={this.updateCurrency}>
            <option value='none'>Select currency</option>
            {currenciesToRender}
          </Select>
        </Modal>
      </React.Fragment>
    )
  }
}

export default SetCurrency
