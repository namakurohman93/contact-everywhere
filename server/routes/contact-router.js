const router = require('express').Router()
const ContactController = require('../controllers/contact-controller')
const { authorize } = require('../middlewares/auth')

router.get('/', ContactController.getUserContactList)
router.post('/', ContactController.addNewContact)
router.use('/:contactId', authorize)
router.patch('/:contactId', ContactController.editContact)
router.delete('/:contactId', ContactController.deleteContact)

module.exports = router
