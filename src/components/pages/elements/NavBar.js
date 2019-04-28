import React from 'react'
import { NavLink } from 'react-router-dom'

const NavBar = () => {
  return (
    <nav className='nav-wrapper red darken-3'>
      <div className='container'>
        <a href='/' className='brand-logo'>Time Tracker</a>
        <ul className='right hide-on-small-only'>
          <li><NavLink to='/'>Home</NavLink></li>
          <li><NavLink to='/Reports'>Reports</NavLink></li>
          <li><NavLink to='/About'>About</NavLink></li>
          <li><NavLink to='/Contact'>Contact</NavLink></li>
        </ul>
      </div>
    </nav>

  )
}

export default NavBar
