'use strict'

const bcryptjs = require('bcryptjs')

module.exports = (sequelize, DataTypes) => {
  class User extends sequelize.Sequelize.Model {}

  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Username is required',
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Email is required',
          },
          isEmail: {
            msg: 'Invalid Email format',
          },
          isUnique: function(email, next) {
            sequelize.models.User.findOne({ where: { email } })
              .then(user => {
                if (user) next('Email already registered')
                else next()
              })
              .catch(err => {
                next(err.message)
              })
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Password is required',
          },
          len: {
            args: [6, 99],
            msg: 'Password length min 6 characters',
          },
        },
      },
    },
    {
      hooks: {
        beforeCreate(user) {
          user.password = bcryptjs.hashSync(
            user.password,
            bcryptjs.genSaltSync(10),
          )
        },
      },
      sequelize,
    },
  )

  User.associate = function(models) {
    User.hasMany(models.Contact)
  }

  return User
}
