import React, { Component } from 'react'
import NavBar from './components/pages/elements/NavBar'
import { BrowserRouter, Route } from 'react-router-dom'
import Home from './components/pages/Home'
import About from './components/pages/About'
import Contact from './components/pages/Contact'
import Tasks from './components/projects/todos/Tasks'

class App extends Component {
  render () {
    return (
      <BrowserRouter>
        <NavBar />
        <Route exact path='/' component={Home} />
        <Route path='/About' component={About} />
        <Route path='/Contact' component={Contact} />
        <Route path='/:project_name' component={Tasks} />
      </BrowserRouter>
    )
  }
}

export default App
