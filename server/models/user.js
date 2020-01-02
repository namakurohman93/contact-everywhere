// 'use strict';
// module.exports = (sequelize, DataTypes) => {
// const User = sequelize.define('User', {
// username: DataTypes.STRING,
// email: DataTypes.STRING,
// password: DataTypes.STRING
// }, {});
// User.associate = function(models) {
// // associations can be defined here
// };
// return User;
// };

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

  return User
}
