import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import "./index.css"

const AdminNavbar = () => {
 
  return (
    
    <div>
    <div className="grad-bar"></div>
    <nav className="navbar">
      <NavLink className="logo" to='/'> DalalTechnologies</NavLink>
      <div className='nav'>
          <NavLink>
          <NavLink className='nav1' to="/Order">Order Management</NavLink>
          <NavLink className='nav1' to="/BlogUpload">BlogUpload</NavLink>
          <NavLink className='nav1' to="/ProductUpload">ProductUpload</NavLink>
          <NavLink className='nav1' to="/CategoryUpload">CategoryUpload</NavLink>
          </NavLink>
          </div>
      </nav>
    </div>
  );
};

export default AdminNavbar;
