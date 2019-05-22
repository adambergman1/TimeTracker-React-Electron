import React, { Component } from 'react'
import { Select, Modal, Button } from 'react-materialize'
import currencyList from '../../lib/currencies.js'
import { findInLocalStorage, saveToLocalStorage } from '../../lib/crudHelpers'

class SetCurrency extends Component {
  state = {
    selectedCurrency: '',
    currencies: currencyList
  }

  componentDidMount() {
    if (localStorage.hasOwnProperty('currency')) {
      this.setState({ selectedCurrency: findInLocalStorage('currency') })
    }
  }

  updateCurrency = e => {
    this.setState({ selectedCurrency: e.target.value })
    saveToLocalStorage('currency', e.target.value)
    this.props.onCurrencyUpdate({ selectedCurrency: e.target.value })
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
      <div className='container'>
        <div className='row center'>
          <div className='col s12'>
            <Modal
              trigger={
                <Button className={selectedCurrency ? 'btn-floating right' : 'btn grey lighten-3 black-text'}>
                  {selectedCurrency ? selectedCurrency : 'Set currency'}
                </Button>
              }
            >
              <Select onChange={this.updateCurrency}>
                <option value='none'>Select currency</option>
                {currenciesToRender}
              </Select>
            </Modal>
          </div>
        </div>
      </div>
    )
  }
}

export default SetCurrency
