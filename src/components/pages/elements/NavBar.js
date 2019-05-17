import React from 'react'
import { NavLink } from 'react-router-dom'

const NavBar = () => {
  return (
    <nav className='nav-wrapper red darken-3'>
      <div className='container'>
        <a href='/' className='brand-logo'>Time Tracker</a>
        <ul className='right'>
          <li><NavLink to='/Reports'>Reports</NavLink></li>
        </ul>
      </div>
    </nav>

  )
}

export default NavBar
