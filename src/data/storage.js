// ✅ Handles all localStorage related logic

export const setUser = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const getUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

export const removeUser = () => {
  localStorage.removeItem("user");
};

export const setStudents = (students) => {
  localStorage.setItem("students", JSON.stringify(students));
};

export const getStudents = () => {
  const students = localStorage.getItem("students");
  return students ? JSON.parse(students) : [];
};

export const setBeds = (beds) => {
  localStorage.setItem("beds", JSON.stringify(beds));
};

export const getBeds = () => {
  const beds = localStorage.getItem("beds");
  return beds ? JSON.parse(beds) : [];
};

export const setComplaints = (complaints) => {
  localStorage.setItem("complaints", JSON.stringify(complaints));
};

export const getComplaints = () => {
  const complaints = localStorage.getItem("complaints");
  return complaints ? JSON.parse(complaints) : [];
};

export const setNotices = (notices) => {
  localStorage.setItem("notices", JSON.stringify(notices));
};

export const getNotices = () => {
  const notices = localStorage.getItem("notices");
  return notices ? JSON.parse(notices) : [];
};

// Aliases for compatibility with existing code
export const clearUser = removeUser;
export const saveBeds = setBeds;
export const saveComplaints = setComplaints;
export const saveStudents = setStudents;
export const getCurrentUser = getUser;
