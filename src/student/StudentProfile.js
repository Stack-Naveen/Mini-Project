import React, { useEffect, useState } from "react";
import { getUser, setUser, getStudents, setStudents } from "../data/storage";
import { useNavigate } from "react-router-dom";
import "./Student.css";

const StudentProfile = () => {
  const navigate = useNavigate();
  const [user, setLocalUser] = useState(getUser() || null);
  const [form, setForm] = useState({ username: "", email: "" });

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    setForm({
      username: user?.username || user?.name || "",
      email: user?.email || "",
    });
  }, [user, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    const username = form.username.trim();
    const email = form.email.trim();

    if (!username || !email) {
      alert("Name and email cannot be empty.");
      return;
    }

    const updatedUser = { ...user, username, name: username, email };
    setLocalUser(updatedUser);
    setUser(updatedUser);

    const students = getStudents() || [];
    const updatedStudents = students.map((s) =>
      s.id === updatedUser.id
        ? { ...s, name: updatedUser.username, email: updatedUser.email }
        : s
    );
    setStudents(updatedStudents);

    alert("Profile updated successfully");
  };

  if (!user) return null;

  return (
    <div className="student-profile">
      <h2>Your Profile</h2>
      <form className="profile-form" onSubmit={handleSave}>
        <div className="profile-row">
          <label>Name</label>
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            placeholder="Your name"
            required
          />
        </div>
        <div className="profile-row">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
            required
          />
        </div>
        <button type="submit" className="btn-primary">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default StudentProfile;
