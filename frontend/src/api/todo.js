import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // ✅ Ensures cookies (token) are sent with requests
});

// ✅ Fetch all todos for the logged-in user
export const fetchTodos = async () => {
  try {
    const response = await api.get("/todos");
    return response.data;
  } catch (error) {
    console.error("Error fetching todos:", error);
    throw error;
  }
};

// ✅ Add a new todo
export const addTodo = async (newTodo) => {
  try {
    const response = await api.post("/todos", newTodo);
    return response.data;
  } catch (error) {
    console.error("Error adding todo:", error);
    throw error;
  }
};

// ✅ Update a todo's completion status
export const updateTodo = async (todoId, completed) => {
  try {
    const response = await api.patch(`/todos/${todoId}`, { completed });
    return response.data;
  } catch (error) {
    console.error("Error updating todo:", error);
    throw error;
  }
};

// ✅ Delete a todo
export const deleteTodo = async (todoId) => {
  try {
    await api.delete(`/todos/${todoId}`);
  } catch (error) {
    console.error("Error deleting todo:", error);
    throw error;
  }
};
