import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ countCartItems }) => {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  return (
    <>
      <div className="grad-bar"></div>
      <nav className="navbar">
        <div className="nav-container">
          <NavLink exact to="/" className="nav-logo" onClick={closeMobileMenu}>
            DalalTechnologies
          </NavLink>

          <div className="nav-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"}></i>
          </div>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <NavLink
                exact
                to="/"
                activeClassName="active"
                className="nav-links"
                onClick={closeMobileMenu}>
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
				to="/Project"
                activeClassName="active"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Shop
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/Blogs" 
                activeClassName="active"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Blog
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/contact"
                activeClassName="active"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Contact Us
              </NavLink>
            </li>
            <li className="nav-item ">
              <NavLink to="/Cart" onClick={closeMobileMenu}>
                <img src="./Images/ShoppingCart.png" alt="cart" />
                <p>{countCartItems ? countCartItems : ""}</p>
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
