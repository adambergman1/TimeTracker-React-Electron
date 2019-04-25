import React from 'react'
import { NavLink } from 'react-router-dom'
// import { SideNav, SideNavItem, Button } from 'react-materialize'

const NavBar = () => {
  return (
    <nav className='nav-wrapper red darken-3'>
      <div className='container'>
        <NavLink to='/' className='brand-logo'>Time Tracker</NavLink>
        <ul className='right'>
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
