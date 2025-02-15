import { useState } from "react";
import { addTodo } from "../api/todo"; // ✅ Import API function
import PropTypes from "prop-types";
import "../style/TodoForm.css";

const TodoForm = ({ onAdd }) => {
  const [newTodo, setNewTodo] = useState("");

  const handleAddTodo = async () => {
    try {
      const response = await addTodo({ title: newTodo }); // ✅ Use centralized API function
      onAdd(response); // ✅ Update parent state in TodoMain
      setNewTodo(""); // ✅ Clear input field after submission
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  return (
    <form
      id="form-container"
      onSubmit={(e) => {
        e.preventDefault();
        handleAddTodo(); // ✅ Call the function
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
          required
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
};
