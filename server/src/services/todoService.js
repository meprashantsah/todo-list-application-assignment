const Todo = require('../models/Todo');
const { Parser } = require('json2csv');

const createTodo = async (data) => {
  const todo = new Todo(data);
  return await todo.save();
};

const getTodos = async (filter, options) => {
  const { limit = 10, page = 1, sortBy = 'createdAt', sortOrder = 'desc' } = options;
  const skip = (page - 1) * limit;

  const todos = await Todo.find(filter)
    .sort({ [sortBy]: sortOrder === 'desc' ? -1 : 1 })
    .skip(skip)
    .limit(limit)
    .populate('user', 'username email')
    .populate('mentionedUsers', 'username email');
  
  const total = await Todo.countDocuments(filter);

  return { todos, total, page, limit };
};

const getTodoById = async (id) => {
  return await Todo.findById(id)
    .populate('user', 'username email')
    .populate('mentionedUsers', 'username email');
};

const updateTodo = async (id, data) => {
  return await Todo.findByIdAndUpdate(id, data, { new: true });
};

const deleteTodo = async (id) => {
  return await Todo.findByIdAndDelete(id);
};

const toggleComplete = async (id) => {
  const todo = await Todo.findById(id);
  if (!todo) throw new Error('Todo not found');
  todo.completed = !todo.completed;
  return await todo.save();
};

const addNote = async (todoId, noteData) => {
  const todo = await Todo.findById(todoId);
  if (!todo) throw new Error('Todo not found');
  todo.notes.push(noteData);
  return await todo.save();
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
