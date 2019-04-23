import React, { Component } from 'react'
import ReactDatePicker from 'react-datepicker'

import 'react-datepicker/dist/react-datepicker.css'

class DatePicker extends Component {
  constructor (props) {
    super(props)
    this.state = {
      startDate: new Date(new Date().setDate(new Date().getDate() - 30)),
      endDate: new Date()
    }
  }

  handleChangeStart = start => {
    this.setState({ startDate: start })
    this.props.onStartChange({ start: this.state.startDate})
  }

    handleChangeEnd = end => {
    this.setState({ endDate: end })
    this.props.onEndChange({ end: this.state.endDate })
  }

  render () {
    return (
    <div className="date-range-picker">
        <span>From</span>
        <ReactDatePicker
            maxDate={new Date()}
            selected={this.state.startDate}
            startDate={this.state.startDate}
            endDate={this.state.endDate}
            onChange={this.handleChangeStart}
            />

    <span>To</span>
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
