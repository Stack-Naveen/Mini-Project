import React from "react";
import { useNavigate } from "react-router-dom";
import { getUser, removeUser } from "../data/storage";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const user = getUser();

  const handleLogout = () => {
    removeUser();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h2>🏨 Hostel Management System</h2>
      </div>
      <div className="navbar-right">
        <span className="welcome">Welcome, {user?.username}</span>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
