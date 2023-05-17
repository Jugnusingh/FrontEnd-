import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import AdminNavbar from './adminNavbar';


const AdminPanel = () => {
 
  return (
    <div>
      <div>
       
      <AdminNavbar/>
      </div>
      <div className='welcome-admin'>
         <h1> <center>Welcome to admin panel</center> </h1>
      </div>
      </div>
  );
};

export default AdminPanel;
