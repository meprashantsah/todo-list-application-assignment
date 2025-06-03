const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');
const authenticate = require('../middlewares/authMiddleware');


router.post('/', authenticate, todoController.createTodo);
router.get('/', authenticate, todoController.getTodos);
router.get('/:id', authenticate, todoController.getTodoById);
router.put('/:id', authenticate, todoController.updateTodo);
router.delete('/:id', authenticate, todoController.deleteTodo);
router.patch('/:id/complete', authenticate, todoController.toggleComplete);


router.post('/:id/notes', todoController.addNote);

module.exports = router;
