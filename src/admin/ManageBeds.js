import React, { useEffect, useMemo, useState } from "react";
import { getBeds, saveBeds, getStudents } from "../data/storage";
import "./ManageBeds.css";

const ManageBeds = () => {
  const [beds, setBeds] = useState([]);
  const [form, setForm] = useState({ id: "", room: "", status: "Available" });
  const [isEditing, setIsEditing] = useState(false);

  // extra fields (kept separate so original variable names remain)
  const [bedLabel, setBedLabel] = useState(""); // e.g., "Bed A"
  const [assignTo, setAssignTo] = useState(""); // student name or email

  useEffect(() => {
    setBeds(getBeds());
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!form.room.trim()) {
      alert("Room number is required");
      return false;
    }
    return true;
  };

  const resolveStudentId = () => {
    if (!assignTo.trim()) return undefined;
    const students = getStudents() || [];
    const found =
      students.find(
        (s) =>
          s.email?.toLowerCase() === assignTo.toLowerCase() ||
          s.name?.toLowerCase() === assignTo.toLowerCase() ||
          s.username?.toLowerCase() === assignTo.toLowerCase()
      ) || null;
    return found?.id;
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const newBed = {
      ...form,
      id: Date.now().toString(),
      bed: bedLabel || undefined,
      studentId: resolveStudentId(),
    };

    const updated = [...beds, newBed];
    setBeds(updated);
    saveBeds(updated);

    setForm({ id: "", room: "", status: "Available" });
    setBedLabel("");
    setAssignTo("");
  };

  const handleEdit = (bed) => {
    setForm({ id: bed.id, room: bed.room, status: bed.status });
    setBedLabel(bed.bed || "");
    setAssignTo("");
    setIsEditing(true);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const sid = resolveStudentId();
    const updated = beds.map((b) =>
      b.id === form.id
        ? {
            ...b,
            room: form.room,
            status: form.status,
            bed: bedLabel || b.bed,
            // if assignTo provided, set; if cleared and Available, remove
            studentId:
              sid !== undefined
                ? sid
                : form.status === "Available"
                ? undefined
                : b.studentId,
          }
        : b
    );
    setBeds(updated);
    saveBeds(updated);

    setForm({ id: "", room: "", status: "Available" });
    setBedLabel("");
    setAssignTo("");
    setIsEditing(false);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this bed?")) {
      const updated = beds.filter((b) => b.id !== id);
      setBeds(updated);
      saveBeds(updated);
    }
  };

  const counts = useMemo(() => {
    const total = beds.length;
    const available = beds.filter((b) => b.status === "Available").length;
    const occupied = beds.filter((b) => b.status === "Occupied").length;
    const reserved = beds.filter((b) => b.status === "Reserved").length;
    return { total, available, occupied, reserved };
  }, [beds]);

  return (
    <div className="manage-beds">
      <h2>Manage Beds</h2>

      <div className="bed-counters">
        <div>Totals: {counts.total}</div>
        <div>Available: {counts.available}</div>
        <div>Occupied: {counts.occupied}</div>
        <div>Reserved: {counts.reserved}</div>
      </div>

      <form
        onSubmit={isEditing ? handleUpdate : handleAdd}
        className="bed-form"
      >
        <input
          type="text"
          name="room"
          placeholder="Room Number"
          value={form.room}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Bed (e.g., Bed A)"
          value={bedLabel}
          onChange={(e) => setBedLabel(e.target.value)}
        />
        <select name="status" value={form.status} onChange={handleChange}>
          <option value="Available">Available</option>
          <option value="Occupied">Occupied</option>
          <option value="Reserved">Reserved</option>
        </select>
        <input
          type="text"
          placeholder="Assign To (name/email) — optional"
          value={assignTo}
          onChange={(e) => setAssignTo(e.target.value)}
        />
        <button type="submit">{isEditing ? "Update Bed" : "Add Bed"}</button>
        {isEditing && (
          <button
            type="button"
            className="cancel-btn"
            onClick={() => {
              setIsEditing(false);
              setForm({ id: "", room: "", status: "Available" });
              setBedLabel("");
              setAssignTo("");
            }}
          >
            Cancel
          </button>
        )}
      </form>

      <table className="bed-table">
        <thead>
          <tr>
            <th>Room</th>
            <th>Bed</th>
            <th>Assigned To</th>
            <th>Status</th>
            <th style={{ width: 200 }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {beds.length > 0 ? (
            beds.map((bed) => (
              <tr key={bed.id}>
                <td>{bed.room}</td>
                <td>{bed.bed || "-"}</td>
                <td>{bed.studentId ? bed.studentId : "-"}</td>
                <td>{bed.status}</td>
                <td>
                  <button onClick={() => handleEdit(bed)} className="edit-btn">
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(bed.id)}
                    className="delete-btn"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No beds found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ManageBeds;
