import React, { Component } from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'
import Home from './components/pages/Home'
import Reports from './components/pages/Reports'

class App extends Component {
  componentDidMount () {
    console.log(this.props)
  }
  render () {
    return (
      <HashRouter>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/Reports' component={Reports} />
        </Switch>
      </HashRouter>
    )
  }
}

export default App
