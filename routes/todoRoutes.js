const router = require('express').Router();
const { getTodos, createTodo, specifyTodo, deleteTodo } = require('../controllers/todoController');

//to list all todos 
router.get('/', (req, res) => getTodos(req, res));

//create a todo
router.post('/', (req, res) => createTodo(req, res));

//get a todo by a unique id
router.get('/:uniqueId', (req, res) => specifyTodo(req, res));

//delete a todo
router.delete('/:uniqueId', (req, res) => deleteTodo(req, res));

module.exports = router;