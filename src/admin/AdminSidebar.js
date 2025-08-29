import React from "react";
import { NavLink } from "react-router-dom";
import "./AdminSidebar.css";

const AdminSidebar = () => {
  return (
    <div className="admin-sidebar">
      <h2 className="sidebar-title">Admin Panel</h2>
      <nav>
        <ul>
          <li>
            <NavLink
              to="/admin/dashboard"
              className={({ isActive }) => (isActive ? "active" : "")}
              end
            >
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/students"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Manage Students
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/beds"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Manage Beds
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/complaints"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Manage Complaints
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default AdminSidebar;
