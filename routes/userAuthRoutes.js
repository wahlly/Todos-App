const router = require('express').Router()
const { registerUser, checkUsersLogin, logout } = require('../controllers/userController')


//User registration
router.post('/register', (req, res) => registerUser(req, res))

//User Login
router.post('/login', (req, res) => checkUsersLogin(req, res))

//User logout
router.get('/logout', (req, res) => logout(req, res))


module.exports = router