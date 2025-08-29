import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Auth/Login";
import AdminDashboard from "./admin/AdminDashboard";
import StudentDashboard from "./student/StudentDashboard";
import StudentProfile from "./student/StudentProfile";
import StudentComplaints from "./student/StudentComplaints";
import StudentNotices from "./student/StudentNotices";
import StudentNavbar from "./student/StudentNavbar";
import StudentSidebar from "./student/StudentSidebar";
import { getUser } from "./data/storage";

const StudentLayout = () => (
  <div className="student-shell">
    <StudentNavbar />
    <div className="student-body">
      <StudentSidebar />
      <div className="student-content">
        <Routes>
          <Route path="/" element={<StudentDashboard />} />
          <Route path="profile" element={<StudentProfile />} />
          <Route path="complaints" element={<StudentComplaints />} />
          <Route path="notices" element={<StudentNotices />} />
          <Route path="*" element={<Navigate to="/student" replace />} />
        </Routes>
      </div>
    </div>
  </div>
);

const App = () => {
  const user = getUser();

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />

      <Route
        path="/admin/*"
        element={
          user?.role === "admin" ? <AdminDashboard /> : <Navigate to="/login" />
        }
      />

      <Route
        path="/student/*"
        element={
          user?.role === "student" ? (
            <StudentLayout />
          ) : (
            <Navigate to="/login" />
          )
        }
      />

      <Route path="*" element={<h2>404 Page Not Found</h2>} />
    </Routes>
  );
};

export default App;
