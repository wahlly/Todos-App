const router = require('express').Router();
const { getTodos, createTodo, deleteTodo, editTodo, specifyTodo } = require('../controllers/frontendController');
const { newTodo, userLogin, registerUser } = require('../controllers/formController');
const { requireLogin } = require('../middlewares/auth');


//get the User lgin page
router.get('/login', (req, res) => userLogin(req, res))

//get the User registration page
router.get('/register', (req, res) => registerUser(req, res))

//get the dashboard which shows a list of all the available todos
router.get('/', requireLogin, (req, res) => getTodos(req, res));

//rendering the createTodo form page
router.get('/createTodo', requireLogin, (req, res) => newTodo(req, res));

//handles a post request sent from the client side to create a new todo
router.post('/createTodo', requireLogin, (req, res) => createTodo(req, res));

//handles a get request sent from the client side to delete a todo
router.get('/deleteTodo/:_id', requireLogin, (req, res) => deleteTodo(req, res));

//handles a get request sent from the client side to edit a todo
router.get('/editTodo/:uniqueId', requireLogin, (req, res) => specifyTodo(req, res))

//handles a post request request sent from the client side to confirm the submission of update of an edited todo
router.post('/updateTodo/:uniqueId', requireLogin, (req, res) => editTodo(req, res));

module.exports = router;