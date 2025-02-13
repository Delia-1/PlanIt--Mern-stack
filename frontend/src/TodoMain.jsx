import { useEffect, useState } from 'react';
import axios from 'axios';
import TodoForm from './TodoForm';
import trash from './assets/trash.svg';
import './style/todoMain.css';
import Confetti from 'react-confetti';

const API_URL = import.meta.env.VITE_BACKEND_URL

function TodoMain() {
  const [todos, setTodos] = useState([]);
  const [showConfetti, setShowConfetti] = useState(false);

  const completedTodos = todos.filter((todo) => todo.completed).length;
  const totalTodos = todos.length;
  const progress = totalTodos > 0 ? (completedTodos / totalTodos) * 100 : 0;

  const addTodo = (newTodo) => {
    setTodos([...todos, newTodo]);
  };

  const updateTodoState = (updatedTodo) => {
    setTodos(todos.map((todo) => (todo._id === updatedTodo._id ? updatedTodo : todo)));
  };

  useEffect(() => {
    axios
      .get(`${API_URL}/api/todos`)
      .then((res) => {
        setTodos(res.data);
      })
      .catch((err) => {
        console.error('Error fetching todos:', err);
      });
  }, []);

  const handleUpdateTodo = (todo) => {
    const wasCompleted = todo.completed; // Track the previous state

    axios
      .patch(`${API_URL}/api/todos/${todo._id}`, { completed: !todo.completed })
      .then((res) => {
        updateTodoState(res.data);

        // Show confetti only if the task has been marked as completed
        if (!wasCompleted && res.data.completed) {
          setShowConfetti(true);
          setTimeout(() => setShowConfetti(false), 3000); // Hide confetti after 3 seconds
        }
      })
      .catch((err) => {
        console.error('Error updating todo:', err);
      });
  };

  const handleDeleteTodo = (todo) => {
    axios
      .delete(`${API_URL}/api/todos/${todo._id}`)
      .then(() => {
        setTodos(todos.filter((t) => t._id !== todo._id));
      })
      .catch((err) => {
        console.error('Error deleting todo:', err);
      });
  };

  return (
    <section>
      <h1 className="font-italic fw-bold">✒️ To-Do List 📅</h1>
      {showConfetti && <Confetti />}
      <div className="progress my-3" style={{ height: '30px' }}>
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
      <TodoForm onAdd={addTodo} />
      <div className="list-group">
        {todos.map((todo) => (
          <a
            href="#"
            className="list-group-item list-group-item-action shadow"
            onClick={() => handleUpdateTodo(todo)}
            key={todo._id}
          >
            <div className="d-flex justify-content-between align-items-center">
              <div className='d-flex'>
                <span>

                {todo.completed ? (
                  <i
                    className="fa-solid fa-check fa-lg"
                    style={{ color: 'rgb(17 214 113)' }}
                  ></i>
                ) : (
                  '❌'
                )}
                </span>
                <span className="ms-3">{todo.title}</span>
              </div>
              <img
                className="ms-5"
                src={trash}
                alt="trash-icon"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent the parent click event
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
