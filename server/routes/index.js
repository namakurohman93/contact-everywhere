const router = require('express').Router()
const UserController = require('../controllers/user-controller')
const contactRouter = require('./contact-router.js')
const { authenticate } = require('../middlewares/auth')

router.get('/', function(req, res, next) {
  res.json({ message: 'Server is alive' })
})
router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.get('/users', UserController.getAllUsers)
router.use(authenticate)
router.use('/contacts', contactRouter)

module.exports = router
