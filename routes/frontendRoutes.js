const router = require('express').Router();
const { getTodos, createTodo, deleteTodo, editTodo, specifyTodo } = require('../controllers/frontendController');
const { newTodo, userLogin, registerUser } = require('../controllers/formController');
const { requireLogin } = require('../middlewares/auth');


//get the User lgin page
router.get('/login', (req, res) => userLogin(req, res))

//get the User registration page
router.get('/register', (req, res) => registerUser(req, res))

//get the dashboard which shows a list of all the available todos
router.get('/', (req, res) => getTodos(req, res));

//rendering the createTodo form page
router.get('/createTodo', (req, res) => newTodo(req, res));

//handles a post request sent from the client side to create a new todo
router.post('/createTodo', (req, res) => createTodo(req, res));

//handles a get request sent from the client side to delete a todo
router.get('/deleteTodo/:uniqueId', (req, res) => deleteTodo(req, res));

//handles a get request sent from the client side to edit a todo
router.get('/editTodo/:uniqueId', (req, res) => specifyTodo(req, res))

//handles a post request request sent from the client side to confirm the submission of update of an edited todo
router.post('/updateTodo/:uniqueId', (req, res) => editTodo(req, res));

module.exports = router;