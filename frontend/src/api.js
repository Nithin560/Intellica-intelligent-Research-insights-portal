// Read backend port from Vite environment or use default
const BACKEND_PORT = import.meta.env.VITE_BACKEND_PORT || 5000;
const API_BASE = `http://localhost:${BACKEND_PORT}/api`;

export const getAuthHeaders = () => {
  const token = localStorage.getItem("token");

  if (!token) return {};

  return {
    Authorization: `Bearer ${token}`
  };
};

export default API_BASE;