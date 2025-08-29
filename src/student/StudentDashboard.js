import React, { useEffect, useState } from "react";
import { getCurrentUser, getBeds, getNotices } from "../data/storage";
import { useNavigate, NavLink } from "react-router-dom";
import "./Student.css";

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [bed, setBed] = useState(null);
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    const user = getCurrentUser();
    if (!user) {
      navigate("/login");
      return;
    }
    setStudent(user);

    const allBeds = getBeds() || [];
    const assigned = allBeds.find((b) => b.studentId === user.id);
    setBed(assigned || null);

    const allNotices = (getNotices() || []).slice();
    allNotices.forEach((n) => {
      if (!n.date) n.date = new Date().toLocaleString();
    });
    allNotices.sort((a, b) => new Date(b.date) - new Date(a.date));
    setNotices(allNotices);
  }, [navigate]);

  return (
    <div className="student-dashboard">
      <h2>Welcome, {student?.name || student?.username}</h2>

      <div className="student-info">
        <h3>Room Related Info</h3>
        <div className="room-grid">
          <div>
            <strong>Room no :</strong> {bed?.room || "Not Assigned"}
          </div>
          <div>
            <strong>Seater :</strong> {bed ? "1" : "-"}
          </div>
          <div>
            <strong>Fees PM :</strong> {bed ? "2000" : "-"}
          </div>
          <div>
            <strong>Stay From :</strong>{" "}
            {bed ? new Date().toLocaleDateString() : "-"}
          </div>
          <div>
            <strong>Duration :</strong> {bed ? "12 Months" : "-"}
          </div>
          <div>
            <strong>Food Status :</strong> {bed ? "With Food" : "-"}
          </div>
          <div>
            <strong>Hostel Fee :</strong> {bed ? "24000" : "-"}
          </div>
          <div>
            <strong>Food Fee :</strong> {bed ? "24000" : "-"}
          </div>
          <div>
            <strong>Total Fee :</strong> {bed ? "48000" : "-"}
          </div>
        </div>

        <h3>Personal Info</h3>
        <p>
          <strong>Full Name:</strong> {student?.name || student?.username}
        </p>
        <p>
          <strong>Email:</strong> {student?.email || "-"}
        </p>
      </div>

      <div className="student-actions">
        <h3>Quick Actions</h3>
        <div className="actions-grid">
          <NavLink to="/student/complaints" className="action-card">
            Submit Complaint
          </NavLink>
          <NavLink to="/student/notices" className="action-card">
            View Notices
          </NavLink>
          <NavLink to="/student/profile" className="action-card">
            Edit Profile
          </NavLink>
        </div>
      </div>

      <div className="student-notices">
        <h3>Latest Notices</h3>
        {notices.length > 0 ? (
          <ul>
            {notices.slice(0, 5).map((n) => (
              <li key={n.id}>
                <strong>{n.title}</strong> – {n.description}
                {n.date && <small style={{ display: "block" }}>{n.date}</small>}
              </li>
            ))}
          </ul>
        ) : (
          <p className="empty-state">No notices available.</p>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;
