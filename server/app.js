if (process.env.NODE_ENV === 'development') require('dotenv').config()

const express = require('express')
const routes = require('./routes')
const errorHandler = require('./middlewares/error-handler')
const app = express()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use('/', routes)
app.use(errorHandler)

module.exports = app
