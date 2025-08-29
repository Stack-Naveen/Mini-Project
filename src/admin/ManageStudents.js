import React, { useState, useEffect } from "react";
import { getStudents, saveStudents } from "../data/storage";
import "./ManageStudents.css";

const ManageStudents = () => {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({ id: "", name: "", email: "", room: "" });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setStudents(getStudents());
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!form.name.trim() || !form.email.trim() || !form.room.trim()) {
      alert("Please fill all fields");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(form.email)) {
      alert("Please enter a valid email");
      return false;
    }
    return true;
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const newStudent = { ...form, id: Date.now().toString() };
    const updated = [newStudent, ...students];
    setStudents(updated);
    saveStudents(updated);

    setForm({ id: "", name: "", email: "", room: "" });
  };

  const handleEdit = (student) => {
    setForm(student);
    setIsEditing(true);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const updated = students.map((s) => (s.id === form.id ? form : s));
    setStudents(updated);
    saveStudents(updated);

    setForm({ id: "", name: "", email: "", room: "" });
    setIsEditing(false);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      const updated = students.filter((s) => s.id !== id);
      setStudents(updated);
      saveStudents(updated);
    }
  };

  return (
    <div className="manage-students">
      <h2>Manage Students</h2>

      <form
        onSubmit={isEditing ? handleUpdate : handleAdd}
        className="student-form"
      >
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />
        <input
          type="text"
          name="room"
          placeholder="Room No"
          value={form.room}
          onChange={handleChange}
        />
        <button type="submit">
          {isEditing ? "Update Student" : "Add Student"}
        </button>
        {isEditing && (
          <button
            type="button"
            className="cancel-btn"
            onClick={() => {
              setIsEditing(false);
              setForm({ id: "", name: "", email: "", room: "" });
            }}
          >
            Cancel
          </button>
        )}
      </form>

      <table className="student-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Room</th>
            <th style={{ width: 160 }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.length > 0 ? (
            students.map((student) => (
              <tr key={student.id}>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.room}</td>
                <td>
                  <button
                    onClick={() => handleEdit(student)}
                    className="edit-btn"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(student.id)}
                    className="delete-btn"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No students found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ManageStudents;
