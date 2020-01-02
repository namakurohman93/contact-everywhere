const router = require('express').Router()
const UserController = require('../controllers/user-controller')

router.get('/', function(req, res, next) {
  res.json({ message: 'Server is alive' })
})
router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.get('/users', UserController.getAllUsers)

module.exports = router
