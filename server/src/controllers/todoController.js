const todoService = require('../services/todoService');

const createTodo = async (req, res) => {
  try {
    const todo = await todoService.createTodo({ ...req.body, user: req.user._id });
    res.status(201).json(todo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getTodos = async (req, res) => {
  try {
    const filter = {};
    const { tags, priority, user, completed } = req.query;

    if (tags) filter.tags = { $in: tags.split(',') };
    if (priority) filter.priority = priority;
    if (user) filter.user = user;
    if (completed !== undefined) filter.completed = completed === 'true';

    const options = {
      limit: parseInt(req.query.limit) || 10,
      page: parseInt(req.query.page) || 1,
      sortBy: req.query.sortBy || 'createdAt',
      sortOrder: req.query.sortOrder || 'desc',
    };

    const result = await todoService.getTodos(filter, options);
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getTodoById = async (req, res) => {
  try {
    const todo = await todoService.getTodoById(req.params.id);
    if (!todo) return res.status(404).json({ message: 'Todo not found' });
    res.json(todo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateTodo = async (req, res) => {
  try {
    const todo = await todoService.updateTodo(req.params.id, req.body);
    if (!todo) return res.status(404).json({ message: 'Todo not found' });
    res.json(todo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteTodo = async (req, res) => {
  try {
    const todo = await todoService.deleteTodo(req.params.id);
    if (!todo) return res.status(404).json({ message: 'Todo not found' });
    res.json({ message: 'Todo deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const toggleComplete = async (req, res) => {
  try {
    const todo = await todoService.toggleComplete(req.params.id);
    res.json(todo);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

const addNote = async (req, res) => {
  try {
    const noteData = req.body; // { content: 'some note' }
    const todo = await todoService.addNote(req.params.id, noteData);
    res.status(201).json(todo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


module.exports = {
  createTodo,
  getTodos,
  getTodoById,
  updateTodo,
  deleteTodo,
  toggleComplete,
  addNote,
};
