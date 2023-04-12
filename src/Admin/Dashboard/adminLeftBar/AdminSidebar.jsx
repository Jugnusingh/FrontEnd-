import React from 'react'
import { NavLink } from 'react-router-dom'

const AdminSidebar = () => {
    return (
        <div><div class="sidebar">
            <div class="logo-details">
                <img className="profile-details" src="Images/user.jpg" alt="" />
                <span className="logo_name">Admin</span>
            </div>
            <ul className="nav-links">
                {/* <li>
                    <NavLink className="links_name" to="/Dashboard">Dashboard</NavLink>
                </li> */}
                <li>
                    <NavLink className="links_name" to="/All_Order">All Order</NavLink>
                </li>
                <li>
                    <NavLink className="links_name" to="/Upload">Upload</NavLink>
                </li>
                <li>
                    <NavLink className="links_name" to="/">Logout</NavLink>
                </li>
            </ul>
        </div></div>
    )
}

export default AdminSidebar