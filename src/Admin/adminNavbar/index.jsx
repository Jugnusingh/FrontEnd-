import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import "./index.css"

const AdminNavbar = () => {
  const navigate = useNavigate();
  const [logoutTimeout, setLogoutTimeout] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      // No token exists, redirect to the login page
      navigate('/login');
    } else {
      // Token exists, start the logout timer
      startLogoutTimer();
    }

    return () => {
      // Clear the logout timeout when the component is unmounted
      clearTimeout(logoutTimeout);
    };
  }, []); // The empty dependency array ensures the effect runs only once

  const startLogoutTimer = () => {
    const timeout = setTimeout(() => {
      // Perform logout actions here
      logoutUser();
    },600000 ); // 10 minutes in milliseconds 600000

    setLogoutTimeout(timeout);
  };

  const logoutUser = () => {
    // Clear session/local storage or send a request to invalidate the session
    localStorage.removeItem('token'); // Remove access token from local storage

    // Redirect to the login page
    navigate('/login');
  };

  const handleActivity = () => {
    // Clear the previous logout timeout
    clearTimeout(logoutTimeout);

    // Restart the logout timer
    startLogoutTimer();
  };

  return (
    <div>
      <div className="grad-bar"></div>
      <nav className="navbar">
        <NavLink className="logo" to='/'>DalalTechnologies</NavLink>
        <div className='nav'>
          <NavLink className='nav1' to="/Order" onClick={handleActivity}>Order Management</NavLink>
          <NavLink className='nav1' to="/BlogUpload" onClick={handleActivity}>BlogUpload</NavLink>
          <NavLink className='nav1' to="/UploadManagement" onClick={handleActivity}>UploadManagement</NavLink>
          <NavLink className='nav1' to="/CategoryUpload" onClick={handleActivity}>CategoryUpload</NavLink>
          <button className="logout-button" onClick={logoutUser}>Logout</button>
        </div>
      </nav>
    </div>
  );
};

export default AdminNavbar;
