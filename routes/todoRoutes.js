const router = require('express').Router();
const { getTodos, createTodo, specifyTodo, deleteTodo, getUser } = require('../controllers/todoController');
const { checkIfAdmin } = require('../middlewares/authSeeders');

//to list all todos that belongs to a user
router.get('/user/todos/:id', (req, res) => getTodos(req, res));

//create a todo
router.post('/user/todos/create/:id', (req, res) => createTodo(req, res));

//get a todo by a unique id
router.get('/todos/:uniqueId', (req, res) => specifyTodo(req, res));

//get a user's profile
router.get('/user/profile/:id', (req, res) => getUser(req, res))

//delete a todo
router.delete('/user/todos/:uniqueId', (req, res) => deleteTodo(req, res));

module.exports = router