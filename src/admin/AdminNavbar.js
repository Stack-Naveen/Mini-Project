import React from "react";
import { useNavigate } from "react-router-dom";
import { clearUser, getUser } from "../data/storage";
import "./AdminNavbar.css";

const AdminNavbar = () => {
  const navigate = useNavigate();
  const user = getUser();

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      clearUser();
      navigate("/login");
    }
  };

  return (
    <nav className="admin-navbar">
      <div className="admin-navbar-left">
        <h2>Admin Dashboard</h2>
      </div>
      <div className="admin-navbar-right">
        {user?.username ? (
          <span className="welcome">Welcome, {user.username}</span>
        ) : (
          <span className="welcome">Welcome, Admin</span>
        )}
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>
    </nav>
  );
};

export default AdminNavbar;
