import React, { useMemo } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";
import AdminSidebar from "./AdminSidebar";
import ManageStudents from "./ManageStudents";
import ManageBeds from "./ManageBeds";
import ManageComplaints from "./ManageComplaints";
import { getStudents, getBeds, getComplaints } from "../data/storage";
import "./Admin.css";

const AdminOverview = () => {
  // compute tile stats from localStorage (no backend)
  const stats = useMemo(() => {
    const students = getStudents() || [];
    const beds = getBeds() || [];
    const complaints = (getComplaints() || []).map((c) => ({
      ...c,
      status: c.status || "Pending",
    }));

    const totalStudents = students.length;
    const totalRooms = beds.length; // treating each bed/room record as a room tile
    const totalCourses = 7; // demo number like in ref UI (no backend)
    const totalComplaints = complaints.length;
    const newComplaints = complaints.filter(
      (c) => (c.status || "Pending") === "Pending"
    ).length;
    const inProcess = complaints.filter(
      (c) => (c.status || "Pending") === "In Process"
    ).length;
    const closed = complaints.filter(
      (c) => (c.status || "Pending") === "Resolved"
    ).length;
    const feedbacks = 3; // placeholder to match reference tiles

    return {
      totalStudents,
      totalRooms,
      totalCourses,
      totalComplaints,
      newComplaints,
      inProcess,
      closed,
      feedbacks,
    };
  }, []);

  const Tile = ({ value, label }) => (
    <div className="admin-tile">
      <div className="admin-tile-value">{value}</div>
      <div className="admin-tile-label">{label}</div>
      <div className="admin-tile-footer">SEE ALL →</div>
    </div>
  );

  return (
    <div className="admin-overview">
      <h2>Dashboard</h2>
      <div className="admin-tiles-grid">
        <Tile value={stats.totalStudents} label="STUDENTS" />
        <Tile value={stats.totalRooms} label="TOTAL ROOMS" />
        <Tile value={stats.totalCourses} label="TOTAL COURSES" />
        <Tile value={stats.totalComplaints} label="REGISTERED COMPLAINTS" />
        <Tile value={stats.newComplaints} label="NEW COMPLAINTS" />
        <Tile value={stats.inProcess} label="IN PROCESS COMPLAINTS" />
        <Tile value={stats.closed} label="CLOSED COMPLAINTS" />
        <Tile value={stats.feedbacks} label="TOTAL FEEDBACKS" />
      </div>
    </div>
  );
};

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <AdminNavbar />
      <div className="admin-body">
        <AdminSidebar />
        <div className="admin-content">
          <Routes>
            <Route path="/" element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<AdminOverview />} />
            <Route path="students" element={<ManageStudents />} />
            <Route path="beds" element={<ManageBeds />} />
            <Route path="complaints" element={<ManageComplaints />} />
            <Route
              path="*"
              element={<div className="not-found">Page Not Found</div>}
            />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
