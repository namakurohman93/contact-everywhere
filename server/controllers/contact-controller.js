const { User } = require('../models')
const { Contact } = require('../models')

class ContactController {
  static addNewContact(req, res, next) {
    Contact.create({
      name: req.body.name,
      phoneNumber: req.body.phoneNumber,
      UserId: req.payload.id,
    })
      .then(contact => {
        res.status(201).json(contact)
      })
      .catch(next)
  }

  static deleteContact(req, res, next) {
    Contact.destroy({ where: { id: req.params.contactId } })
      .then(result => {
        if (result > 0) {
          res.json({ message: 'Deleted' })
        } else {
          res.json({ message: 'Failed' })
        }
      })
      .catch(next)
  }

  static editContact(req, res, next) {
    Contact.findOne({ where: { id: req.params.contactId } })
      .then(contact => {
        if (!contact) {
          next({ name: 'NotFound', message: 'Contact not found' })
        } else {
          return Contact.update(
            {
              name: req.body.name || contact.name,
              phoneNumber: req.body.phoneNumber || contact.phoneNumber,
            },
            { where: { id: req.params.contactId } },
          )
        }
      })
      .then(contact => {
        res.json({ message: 'Success update contact' })
      })
      .catch(next)
  }

  static getUserContactList(req, res, next) {
    Contact.findAll({ where: { UserId: req.payload.id } })
      .then(contacts => {
        res.json(contacts)
      })
      .catch(next)
  }
}

module.exports = ContactController
