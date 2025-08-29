import React, { useEffect, useMemo, useState } from "react";
import { getComplaints, saveComplaints } from "../data/storage";
import "./ManageComplaints.css";

const normalize = (c) => ({
  // support both admin-made (student/message) and student-made (title/description)
  id: c.id,
  student: c.student || c.studentName || c.student || "Unknown",
  message: c.message || c.description || c.title || "",
  status: c.status || "Pending",
  date: c.date || new Date().toLocaleString(),
  type: c.type || c.category || "",
  fileName: c.fileName || "",
  raw: c,
});

const ManageComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [form, setForm] = useState({
    id: "",
    student: "",
    message: "",
    status: "Pending",
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const all = (getComplaints() || []).map(normalize);
    setComplaints(all);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!form.student.trim() || !form.message.trim()) {
      alert("Student name and complaint message are required");
      return false;
    }
    return true;
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const newComplaint = {
      id: Date.now().toString(),
      student: form.student,
      message: form.message,
      status: form.status,
      date: new Date().toLocaleString(),
    };

    const updatedRaw = [...complaints.map((c) => c.raw), newComplaint];
    saveComplaints(updatedRaw);
    setComplaints(updatedRaw.map(normalize));

    setForm({ id: "", student: "", message: "", status: "Pending" });
  };

  const handleEdit = (complaint) => {
    setForm({
      id: complaint.id,
      student: complaint.student,
      message: complaint.message,
      status: complaint.status,
    });
    setIsEditing(true);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const updatedRaw = complaints.map((c) =>
      c.id === form.id
        ? {
            ...c.raw,
            student: form.student,
            message: form.message,
            status: form.status,
            date: c.raw.date || new Date().toLocaleString(),
          }
        : c.raw
    );
    saveComplaints(updatedRaw);
    setComplaints(updatedRaw.map(normalize));
    setForm({ id: "", student: "", message: "", status: "Pending" });
    setIsEditing(false);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this complaint?")) {
      const updatedRaw = complaints
        .filter((c) => c.id !== id)
        .map((c) => c.raw);
      saveComplaints(updatedRaw);
      setComplaints(updatedRaw.map(normalize));
    }
  };

  const counts = useMemo(() => {
    const total = complaints.length;
    const pending = complaints.filter((c) => c.status === "Pending").length;
    const inProcess = complaints.filter(
      (c) => c.status === "In Process"
    ).length;
    const resolved = complaints.filter((c) => c.status === "Resolved").length;
    const dismissed = complaints.filter((c) => c.status === "Dismissed").length;
    return { total, pending, inProcess, resolved, dismissed };
  }, [complaints]);

  return (
    <div className="manage-complaints">
      <h2>Manage Complaints</h2>

      <div className="complaint-counters">
        <div>Total: {counts.total}</div>
        <div>New: {counts.pending}</div>
        <div>In Process: {counts.inProcess}</div>
        <div>Resolved: {counts.resolved}</div>
        <div>Dismissed: {counts.dismissed}</div>
      </div>

      <form
        onSubmit={isEditing ? handleUpdate : handleAdd}
        className="complaint-form"
      >
        <input
          type="text"
          name="student"
          placeholder="Student Name"
          value={form.student}
          onChange={handleChange}
        />
        <textarea
          name="message"
          placeholder="Complaint"
          value={form.message}
          onChange={handleChange}
        />
        <select name="status" value={form.status} onChange={handleChange}>
          <option value="Pending">Pending</option>
          <option value="In Process">In Process</option>
          <option value="Resolved">Resolved</option>
          <option value="Dismissed">Dismissed</option>
        </select>
        <button type="submit">
          {isEditing ? "Update Complaint" : "Add Complaint"}
        </button>
        {isEditing && (
          <button
            type="button"
            className="cancel-btn"
            onClick={() => {
              setIsEditing(false);
              setForm({ id: "", student: "", message: "", status: "Pending" });
            }}
          >
            Cancel
          </button>
        )}
      </form>

      <table className="complaint-table">
        <thead>
          <tr>
            <th>Student</th>
            <th>Details</th>
            <th>Type</th>
            <th>Status</th>
            <th>Date</th>
            <th style={{ width: 160 }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {complaints.length > 0 ? (
            complaints.map((c) => (
              <tr key={c.id}>
                <td>{c.student}</td>
                <td>{c.message}</td>
                <td>{c.type || "-"}</td>
                <td>{c.status}</td>
                <td>{c.date}</td>
                <td>
                  <button onClick={() => handleEdit(c)} className="edit-btn">
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(c.id)}
                    className="delete-btn"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No complaints found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ManageComplaints;
