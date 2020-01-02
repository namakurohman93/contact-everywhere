module.exports = function(err, req, res, next) {
  switch (err.name) {
    case 'SequelizeValidationError':
      const errors = []
      err.errors.forEach(error => errors.push(error.message))
      res.status(400).json({ errors })
      break

    case 'MissingBody':
      res.status(400).json({ errors: err.message })
      break

    case 'NotFound':
      res.status(404).json({ errors: err.message })
      break

    default:
      res.status(500).json(err)
  }
}
