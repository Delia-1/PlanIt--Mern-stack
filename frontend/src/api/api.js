import axios from "axios";

// ✅ Fix the API base URL (Ensure it includes `/auth`)
const API_URL = import.meta.env.VITE_BACKEND_URL || "https://plan-it-mern-stack-back.vercel.app";

// || "http://localhost:5000/auth"

// ✅ Create axios instance
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // ✅ Ensures cookies are included
});

// ✅ Fix API paths to match backend
export const loginUser = async (email, password) => {
  try {
    const response = await api.post("/auth/login", { email, password });
    return response.data;
  } catch (error) {
    console.error("❌ Login error:", error.response?.data || error.message);
    throw error;
  }
};

export const registerUser = async (username, email, password) => {
  try {
    const response = await api.post(`${API_URL}/auth/register`, { username, email, password });
    return response.data;
  } catch (error) {
    console.error("❌ Registration error:", error);
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    await axios.post(`${API_URL}/auth/logout`, {}, { withCredentials: true });
    console.log("✅ Successfully logged out");

    localStorage.removeItem("authToken"); // ✅ Ensure token is cleared
  } catch (error) {
    console.error("❌ Logout error:", error);
  }
};

// ✅ Fix checkAuth() so it correctly calls `/auth/check`
export const checkAuth = async () => {
  try {
    const response = await api.get("/auth/check");
    return response.data;
  } catch (error) {
    console.error("❌ checkAuth error:", error.response?.data || error.message);
    return { authenticated: false };
  }
};

export default api;
