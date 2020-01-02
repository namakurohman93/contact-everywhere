'use strict'

module.exports = (sequelize, DataTypes) => {
  class Contact extends sequelize.Sequelize.Model {}

  Contact.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Contact name is required',
          },
        },
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Contact number is required',
          },
          len: {
            args: [10, 13],
            msg: 'Contact number length is between 10 and 13',
          },
          isNumeric: {
            msg: 'Contact number only allowed number',
          },
        },
      },
      UserId: DataTypes.INTEGER,
    },
    { sequelize },
  )
  Contact.associate = function(models) {
    Contact.belongsTo(models.User)
  }
  return Contact
}
