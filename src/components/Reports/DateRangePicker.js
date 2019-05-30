import React, { Component } from 'react'
import ReactDatePicker from 'react-datepicker'

import '../../../node_modules/react-datepicker/dist/react-datepicker.css'

class DatePicker extends Component {
  constructor (props) {
    super(props)
    this.state = {
      startDate: new Date(new Date().setDate(new Date().getDate() - 30)),
      endDate: new Date()
    }
  }

  handleChangeStart = start => {
    this.props.onStartChange({ start: start})
    this.setState({ startDate: start })
  }

    handleChangeEnd = end => {
    this.props.onEndChange({ end: end })
    this.setState({ endDate: end })
  }

  render () {
    return (
    <div className="mb-2 valign-wrapper space-evenly">

      <ReactDatePicker
        maxDate={new Date()}
        selected={this.state.startDate}
        startDate={this.state.startDate}
        endDate={this.state.endDate}
        onChange={this.handleChangeStart}
      />

      <span>-</span>

      <ReactDatePicker
          minDate={this.state.startDate}
          maxDate={new Date()}
          selected={this.state.endDate}
          startDate={this.state.startDate}
          endDate={this.state.endDate}
          onChange={this.handleChangeEnd}
      />
    </div>
    )
  }
}

export default DatePicker
