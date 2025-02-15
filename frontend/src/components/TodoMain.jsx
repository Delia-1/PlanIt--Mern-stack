import { useEffect, useState } from "react";
import { fetchTodos, updateTodo, deleteTodo } from "../api/todo"; // ✅ Correct Import
import TodoForm from "./TodoForm";
import trash from "../assets/trash.svg";
import "../style/todoMain.css";
import Confetti from "react-confetti";

function TodoMain() {
  const [todos, setTodos] = useState([]);
  const [showConfetti, setShowConfetti] = useState(false);

  const completedTodos = todos.filter((todo) => todo.completed).length;
  const totalTodos = todos.length;
  const progress = totalTodos > 0 ? (completedTodos / totalTodos) * 100 : 0;

  const addNewTodo = (newTodo) => {
    setTodos([...todos, newTodo]); // ✅ Updates local state when a new todo is added
  };

  useEffect(() => {
    const getTodos = async () => {
      try {
        const todosData = await fetchTodos(); // ✅ Use API function
        setTodos(todosData);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };

    getTodos();
  }, []);

  const handleUpdateTodo = async (todo) => {
    const wasCompleted = todo.completed;

    try {
      const updatedTodo = await updateTodo(todo._id, !todo.completed); // ✅ Use API function
      setTodos(todos.map((t) => (t._id === updatedTodo._id ? updatedTodo : t)));

      if (!wasCompleted && updatedTodo.completed) {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 3000);
      }
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const handleDeleteTodo = async (todo) => {
    try {
      await deleteTodo(todo._id); // ✅ Use API function
      setTodos(todos.filter((t) => t._id !== todo._id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  return (
    <section>
      <h1 className="font-italic fw-bold">✒️ To-Do List 📅</h1>
      {showConfetti && <Confetti />}
      <div className="progress my-3" style={{ height: "30px" }}>
        <div
          className="progress-bar bg-success"
          role="progressbar"
          style={{ width: `${progress}%` }}
          aria-valuenow={progress}
          aria-valuemin="0"
          aria-valuemax="100"
        >
          {Math.round(progress)}%
        </div>
      </div>
      <TodoForm onAdd={addNewTodo} /> {/* ✅ Ensure this correctly updates the state */}
      <div className="list-group">
        {todos.map((todo) => (
          <a
            href="#"
            className="list-group-item list-group-item-action shadow"
            onClick={() => handleUpdateTodo(todo)}
            key={todo._id}
          >
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex">
                <span>
                  {todo.completed ? (
                    <i className="fa-solid fa-check fa-lg" style={{ color: "rgb(17 214 113)" }}></i>
                  ) : (
                    "❌"
                  )}
                </span>
                <span className="ms-3">{todo.title}</span>
              </div>
              <img
                className="ms-5"
                src={trash}
                alt="trash-icon"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteTodo(todo);
                }}
              />
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

export default TodoMain;
