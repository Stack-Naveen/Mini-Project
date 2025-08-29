import React, { useEffect, useState } from "react";
import { getCurrentUser, getComplaints, saveComplaints } from "../data/storage";
import { useNavigate } from "react-router-dom";
import "./Student.css";

const StudentComplaints = () => {
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [complaints, setComplaints] = useState([]);
  const [form, setForm] = useState({ title: "", description: "" });
  const [type, setType] = useState(""); // complaint type (dropdown)
  const [fileName, setFileName] = useState(""); // optional file name (UI only)

  useEffect(() => {
    const user = getCurrentUser();
    if (!user) {
      navigate("/login");
      return;
    }
    setStudent(user);

    const allComplaints = getComplaints() || [];
    const mine = allComplaints.filter((c) => c.studentId === user.id);
    mine.sort((a, b) => new Date(b.date) - new Date(a.date));
    setComplaints(mine);
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!student) return;

    const title = form.title.trim();
    const description = form.description.trim();
    if (!title || !description) return;

    const newComplaint = {
      id: Date.now().toString(),
      studentId: student.id,
      studentName: student.name || student.username,
      title,
      description,
      type, // new field to match UI
      fileName, // UI-only
      status: "Pending",
      date: new Date().toLocaleString(),
    };

    const allComplaints = getComplaints() || [];
    const updated = [newComplaint, ...allComplaints];
    saveComplaints(updated);

    const mine = updated.filter((c) => c.studentId === student.id);
    mine.sort((a, b) => new Date(b.date) - new Date(a.date));
    setComplaints(mine);

    setForm({ title: "", description: "" });
    setType("");
    setFileName("");
  };

  return (
    <div className="student-complaints">
      <h2>Register Complaint</h2>
      <form onSubmit={handleSubmit} className="complaint-form">
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="">Select Complaint Type</option>
          <option value="Room">Room</option>
          <option value="Mess/Food">Mess/Food</option>
          <option value="Maintenance">Maintenance</option>
          <option value="Other">Other</option>
        </select>

        <input
          type="text"
          placeholder="Complaint Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />
        <textarea
          placeholder="Explain the Complaint"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          required
        ></textarea>

        <input
          type="text"
          placeholder="File (if any) — just enter a file name"
          value={fileName}
          onChange={(e) => setFileName(e.target.value)}
        />

        <button type="submit">Submit</button>
      </form>

      <h3>My Complaints</h3>
      {complaints.length > 0 ? (
        <ul className="complaints-list">
          {complaints.map((c) => (
            <li key={c.id}>
              <strong>{c.title}</strong> <em>({c.type || "General"})</em>{" "}
              <em>— {c.status}</em>
              <p>{c.description}</p>
              {c.fileName ? <small>File: {c.fileName}</small> : null}
              <small style={{ display: "block" }}>{c.date}</small>
            </li>
          ))}
        </ul>
      ) : (
        <p className="empty-state">No complaints submitted yet.</p>
      )}
    </div>
  );
};

export default StudentComplaints;
