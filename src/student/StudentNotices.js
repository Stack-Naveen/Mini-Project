import React, { useEffect, useState } from "react";
import { getNotices } from "../data/storage";
import "./Student.css";

const StudentNotices = () => {
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    const load = () => {
      const allNotices = getNotices() || [];
      allNotices.forEach((n) => {
        if (!n.date) n.date = new Date().toLocaleString();
      });
      allNotices.sort((a, b) => new Date(b.date) - new Date(a.date));
      setNotices(allNotices);
    };
    load();
    const interval = setInterval(load, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="student-notices">
      <h2>Notices</h2>
      {notices.length > 0 ? (
        <ul className="notice-list">
          {notices.map((n) => (
            <li key={n.id}>
              <strong>{n.title}</strong>
              <p>{n.description}</p>
              {n.date && <small>{n.date}</small>}
            </li>
          ))}
        </ul>
      ) : (
        <p className="empty-state">No notices available.</p>
      )}
    </div>
  );
};

export default StudentNotices;
