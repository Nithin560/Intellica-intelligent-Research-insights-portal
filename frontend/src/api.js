// Determine API endpoint based on environment
const configuredApiUrl = import.meta.env.VITE_API_URL || import.meta.env.VITE_BACKEND_URL;

let API_BASE;

if (configuredApiUrl) {
  API_BASE = configuredApiUrl.replace(/\/$/, "");
  if (!API_BASE.endsWith("/api")) {
    API_BASE = `${API_BASE}/api`;
  }
} else if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
  // Development mode - use VITE_BACKEND_PORT
  const BACKEND_PORT = import.meta.env.VITE_BACKEND_PORT || 5000;
  API_BASE = `http://localhost:${BACKEND_PORT}/api`;
} else {
  // Production mode - use same-origin requests (Coolify domain or serverless rewrite)
  API_BASE = '/api';
}

export const getAuthHeaders = () => {
  const token = localStorage.getItem("token");

  if (!token) return {};

  return {
    Authorization: `Bearer ${token}`
  };
};

export default API_BASE;