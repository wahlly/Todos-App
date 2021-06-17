const router = require('express').Router();
const { getTodos, createTodo, specifyTodo, deleteTodo, getUser, updateTodo } = require('../controllers/todoController');
const { checkIfAdmin } = require('../middlewares/authSeeders');

//get all todos
router.get('/user/todos/:userId', (req, res) => getTodos(req, res));

//create a todo
router.post('/user/create/todos/:id', (req, res) => createTodo(req, res));

//get a todo by its uniqueId
router.get('/todos/:uniqueId', (req, res) => specifyTodo(req, res));

//get a user's profile
router.get('/user/profile/:id', (req, res) => getUser(req, res))

//delete a todo
router.delete('/user/todos/:id', (req, res) => deleteTodo(req, res));

//update a todo
router.put('/todos/update/:uniqueId', (req, res) => updateTodo(req, res))

module.exports = router