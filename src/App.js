import React, { Component } from 'react'
import NavBar from './components/pages/elements/NavBar'
import { HashRouter, Route, Switch } from 'react-router-dom'
import Home from './components/pages/Home'
import Reports from './components/pages/Reports'
// import NotFound from './components/pages/NotFound'

class App extends Component {
  render () {
    return (
      <HashRouter>
        {/* <NavBar /> */}
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/Reports' component={Reports} />
          {/* <Route path='*' component={NotFound} status={404} /> */}
        </Switch>
      </HashRouter>
    )
  }
}

export default App
