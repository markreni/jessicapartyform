const express = require('express')
const app = express()
require('express-async-errors')
const cors = require('cors')
const formRouter = require('./controllers/forms')
const mongoose = require('mongoose')
const logger = require('./utils/logger')
const config = require('./utils/config')
const middleware = require('./utils/middleware')

app.use(express.static('build'))

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/forms', formRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app