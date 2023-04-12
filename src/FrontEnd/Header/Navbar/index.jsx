import React from 'react'
import { NavLink } from 'react-router-dom'
import SearchBar from '../SearchBar'
import "./Navbar.css"

const Navbar = ({ countCartItems }) => {
  return (

    <div>
      <div className="grad-bar"></div>
      <nav className="navbar">
        <NavLink className="logo" to='/'> DalalTechnologies</NavLink>
        <div className='nav'>
          <SearchBar/>
          <NavLink className='nav1' to="/">Home</NavLink>
          <NavLink className='nav1' to="/Assignments">Blogs</NavLink>
          <NavLink className='nav1' to="/Project">Shop</NavLink>
          <NavLink className='nav1' to="/Contact">Contact Us</NavLink>
          <NavLink className='cart-icon' to="/Cart"><img src='./Images/cart.png' alt='cart' /> <p>{countCartItems ? countCartItems : ""}</p></NavLink>
        </div>
      </nav>
    </div>

  )
}

export default Navbar