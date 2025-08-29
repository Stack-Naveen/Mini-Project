import React from "react";
import { NavLink } from "react-router-dom";
import "./StudentSidebar.css";

const StudentSidebar = () => {
  return (
    <aside className="student-sidebar">
      <nav aria-label="Student Navigation">
        <ul>
          <li>
            <NavLink
              to="/student"
              end
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/student/profile"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Profile
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/student/complaints"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Complaints
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/student/notices"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Notices
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default StudentSidebar;
