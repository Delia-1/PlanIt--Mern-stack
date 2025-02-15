import express from 'express';
import Todo from '../models/Todo.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Get all todos
router.get('/', authMiddleware, async (req, res) => {
  try {
    const todos = await Todo.find({userId: req.user.id});
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch todos' });
  }
});

// Add a new todo
router.post('/', authMiddleware, async (req, res) => {
  try {
    const newTodo = new Todo({
      title: req.body.title,
      userId: req.user.id,
    });
    const savedTodo = await newTodo.save();
    res.status(201).json(savedTodo);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add todo crotte' });
  }
});

// Update a todo
router.patch('/:id', authMiddleware, async (req, res) => {
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      {_id: req.params.id, userId: req.params.id},
      { completed: req.body.completed },
      { new: true }
    );
    if (!updatedTodo) return res.status(404).json({ error: 'Todo not found' });
    res.json(updatedTodo);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update todo' });
  }
});

// Delete a todo
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete({_id: req.params.id, userId: req.params.id});
    if (!todo) return res.status(404).json({ message: "Tâche non trouvée" });
    res.json({ message: 'Todo deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete todo' });
  }
});

export default router;
