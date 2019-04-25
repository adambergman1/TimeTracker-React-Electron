import React, { Component } from 'react'
import NavBar from './components/pages/elements/NavBar'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Home from './components/pages/Home'
import About from './components/pages/About'
import Contact from './components/pages/Contact'
import Reports from './components/pages/Reports'
import Tasks from './components/projects/todos/Tasks'
// import NotFound from './components/pages/NotFound'

class App extends Component {
  render () {
    return (
      <BrowserRouter>
        <NavBar />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/About' component={About} />
          <Route path='/Contact' component={Contact} />
          <Route path='/Reports' component={Reports} />
          <Route path='/:project_name' component={Tasks} />
          {/* <Route path='*' component={NotFound} status={404} /> */}
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App
