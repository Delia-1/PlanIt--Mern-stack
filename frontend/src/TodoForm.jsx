import axios from 'axios';
import  { useState } from 'react';
import PropTypes from 'prop-types';
import './style/TodoForm.css'

const API_URL = import.meta.env.VITE_BACKEND_URL;
const TodoForm = ({ onAdd }) => {
  const [newTodo, setNewTodo] = useState('');
  const addTodo = async () => {
    try {
      const response = await axios.post(`${API_URL}/api/todos`, { title: newTodo });

      onAdd(response.data);
      setNewTodo('');
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <form
    id="form-container"
    onSubmit={(e) => {
      e.preventDefault();
      addTodo();
     }}
    className="todo-form mb-3"
>
  <div className="input-group flex-column flex-md-row">
    <input
      className="form-control mb-2 mb-md-0 shadow"
      type="text"
      id="addATodo"
      placeholder="e.g., Take the dog out"
      value={newTodo}
      onChange={(e) => setNewTodo(e.target.value)}
    />
    <button id="btn-addTodo" className="btn btn-primary shadow" type="submit">
      Add Todo
    </button>
  </div>
</form>

  );
};
export default TodoForm;

TodoForm.propTypes = {
  onAdd: PropTypes.func.isRequired,
}
