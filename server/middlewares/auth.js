const { User } = require('../models')
const { Contact } = require('../models')
const jwt = require('jsonwebtoken')

module.exports = {
  authenticate: function(req, res, next) {
    if (!req.headers.token) {
      return next({ name: 'MissingParams', message: 'Token is missing' })
    }

    try {
      const payload = jwt.verify(req.headers.token, process.env.JWT_SECRET)
      User.findByPk(payload.id)
        .then(user => {
          if (!user) {
            return next({ name: 'NotFound', message: 'User not found' })
          }
          req.payload = payload
          next()
          return null
        })
        .catch(err => {
          return next(err)
        })
    } catch (err) {
      return next(err)
    }
  },
  authorize: function(req, res, next) {
    Contact.findOne({ where: { id: req.params.contactId } })
      .then(contact => {
        if (!contact) {
          return next({ name: 'NotFound', message: 'Contact not found' })
        } else if (contact.UserId != req.payload.id) {
          return next({
            name: 'NotAuthorize',
            message: 'You are not authorized',
          })
        } else return next()
      })
      .catch(next)
  },
}
