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
      <div className="-admin-grad-bar"></div>
      <nav className="admin-navbar">
        <NavLink className="admin-logo" to='/'>DalalTechnologies</NavLink>
        <div className='admin-nav'>
          <NavLink className='admin-nav1' to="/Order" onClick={handleActivity}>Order Management</NavLink>
          <NavLink className='admin-nav1' to="/SliderImage" onClick={handleActivity}>Slider</NavLink>
          <NavLink className='admin-nav1' to="/BlogUpload" onClick={handleActivity}>BlogUpload</NavLink>
          <NavLink className='admin-nav1' to="/UploadManagement" onClick={handleActivity}>UploadManagement</NavLink>
          <NavLink className='admin-nav1' to="/CategoryUpload" onClick={handleActivity}>CategoryUpload</NavLink>
          <button className="admin-logout-button" onClick={logoutUser}>Logout</button>
        </div>
      </nav>
    </div>
  );
};

export default AdminNavbar;
