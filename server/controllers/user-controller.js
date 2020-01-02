const { User } = require('../models')
const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')

class UserController {
  static register(req, res, next) {
    User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    })
      .then(user => {
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET)
        res.status(201).json({ token, username: user.username })
      })
      .catch(next)
  }

  static login(req, res, next) {
    const errors = []

    if (!req.body.email) errors.push('Email is required')
    if (!req.body.password) errors.push('Password is required')

    if (errors.length > 0) return next({ name: 'MissingBody', message: errors })

    User.findOne({ where: { email: req.body.email } })
      .then(user => {
        if (!user) {
          next({ name: 'NotFound', message: 'Email or password is wrong' })
        }

        if (!bcryptjs.compareSync(req.body.password, user.password)) {
          next({ name: 'NotFound', message: 'Email or password is wrong' })
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET)
        res.json({ token, username: user.username })
      })
      .catch(next)
  }

  static getAllUsers(req, res, next) {
    User.findAll()
      .then(users => {
        res.json(users)
      })
      .catch(next)
  }
}

module.exports = UserController
