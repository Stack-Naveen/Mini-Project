import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setUser } from "../data/storage";
import "./Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username.trim()) {
      setError("Username is required!");
      return;
    }

    // include id & email to satisfy student pages (keeps var names)
    setUser({
      id: Date.now().toString(),
      username,
      name: username,
      email: "",
      role,
    });

    if (role === "admin") {
      navigate("/admin");
    } else {
      navigate("/student");
    }
  };

  return (
    <div className="login-container">
      <div className="college-header">
        <div>
          <h1>DVR & Dr. HS MIC College of Technology</h1>
          <p>Kanchikacherla, Andhra Pradesh</p>
          <span>Autonomous Institution</span>
        </div>
      </div>

      <div className="login-box">
        <h2>Hostel Management System</h2>

        {!role && (
          <div className="role-selection">
            <div className="role-card" onClick={() => setRole("student")}>
              <div className="role-icon">🎓</div>
              <h3>Student Portal</h3>
              <p>Login to manage hostel services and student facilities.</p>
              <button className="role-btn">Enter as Student</button>
            </div>

            <div className="role-card" onClick={() => setRole("admin")}>
              <div className="role-icon">🛠️</div>
              <h3>Admin Portal</h3>
              <p>Manage hostel records and oversee student information.</p>
              <button className="role-btn">Enter as Admin</button>
            </div>
          </div>
        )}

        {role && (
          <form onSubmit={handleSubmit} className="login-form">
            {error && <p className="error">{error}</p>}

            <div className="form-group">
              <label>Username:</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder={`Enter your ${role} name`}
              />
            </div>

            <button type="submit" className="login-btn">
              Login as {role.charAt(0).toUpperCase() + role.slice(1)}
            </button>

            <p
              className="back-option"
              onClick={() => {
                setRole("");
                setUsername("");
                setError("");
              }}
            >
              ← Back to role selection
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;
