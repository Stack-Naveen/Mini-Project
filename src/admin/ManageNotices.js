import React, { useState, useEffect } from "react";
import { getNotices, saveNotices } from "../data/storage";
import "./ManageNotices.css";

const ManageNotices = () => {
  const [notices, setNotices] = useState([]);
  const [form, setForm] = useState({ id: "", title: "", description: "" });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const stored = getNotices();
    const list = Array.isArray(stored) ? stored : [];
    // ensure date field exists for sorting & student views
    list.forEach((n) => {
      if (!n.date) n.date = new Date().toLocaleString();
    });
    setNotices(list);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!form.title.trim() || !form.description.trim()) {
      alert("⚠ Please fill all fields");
      return false;
    }
    return true;
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const newNotice = {
      ...form,
      id: Date.now().toString(),
      date: new Date().toLocaleString(),
    };
    const updated = [newNotice, ...notices];
    setNotices(updated);
    saveNotices(updated);

    setForm({ id: "", title: "", description: "" });
  };

  const handleEdit = (notice) => {
    setForm(notice);
    setIsEditing(true);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const updated = notices.map((n) =>
      n.id === form.id
        ? { ...form, date: n.date || new Date().toLocaleString() }
        : n
    );
    setNotices(updated);
    saveNotices(updated);

    setForm({ id: "", title: "", description: "" });
    setIsEditing(false);
  };

  const handleDelete = (id) => {
    if (window.confirm("🗑 Are you sure you want to delete this notice?")) {
      const updated = notices.filter((n) => n.id !== id);
      setNotices(updated);
      saveNotices(updated);
    }
  };

  return (
    <div className="manage-notices">
      <h2>Manage Notices</h2>

      <form
        onSubmit={isEditing ? handleUpdate : handleAdd}
        className="notice-form"
      >
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
        ></textarea>
        <button type="submit" className={isEditing ? "update-btn" : "add-btn"}>
          {isEditing ? "Update" : "Add"} Notice
        </button>
        {isEditing && (
          <button
            type="button"
            className="cancel-btn"
            onClick={() => {
              setForm({ id: "", title: "", description: "" });
              setIsEditing(false);
            }}
          >
            Cancel
          </button>
        )}
      </form>

      <table className="notice-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Date</th>
            <th style={{ width: 150 }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {notices.length > 0 ? (
            notices.map((notice) => (
              <tr key={notice.id}>
                <td>{notice.title}</td>
                <td>{notice.description}</td>
                <td>{notice.date}</td>
                <td>
                  <button
                    onClick={() => handleEdit(notice)}
                    className="edit-btn"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(notice.id)}
                    className="delete-btn"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No notices found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ManageNotices;
