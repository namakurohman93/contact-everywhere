class ContactController {
  static addNewContact(req, res, next) {
    res.json({ message: 'Welcome to add new contact route' })
  }

  static deleteContact(req, res, next) {
    res.json({ message: 'Welcome to delete contact route' })
  }

  static editContact(req, res, next) {
    res.json({ message: 'Welcome to edit contact route' })
  }

  static getUserContactList(req, res, next) {
    res.json({ message: 'Welcome to get user contact list route' })
  }
}

module.exports = ContactController
