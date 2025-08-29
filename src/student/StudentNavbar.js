import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUser, removeUser } from "../data/storage";
import "./StudentNavbar.css";

const StudentNavbar = () => {
  const navigate = useNavigate();
  const user = getUser();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleLogout = () => {
    removeUser();
    navigate("/login");
  };

  return (
    <nav className="student-navbar">
      <h2>Student Panel</h2>
      <div className="student-navbar-right">
        <span className="welcome">
          Welcome, {user?.name || user?.username || "Student"}
        </span>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default StudentNavbar;
