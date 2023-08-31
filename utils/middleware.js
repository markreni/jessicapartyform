const logger = require('./logger')

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)
  logger.error(error.errors.email)

  if(error.name === 'CastError') {
    return response.status(400).json({ error: 'malformatted id' })
  } else if(error.name === 'ValidationError') {
    /* if(error.errors.email.kind === 'unique') {
      return response.status(400).json({ error: 'Email already registered' })
    } */
    return response.status(400).json({ error: error.message })
  } else if(error.name ===  'JsonWebTokenError') {
    if(error.message === 'jwt must be provided') {
      return response.status(401).json({ error: error.message })
    }
    return response.status(400).json({ error: error.message })
  } else if(error.name === 'TokenExpiredError') {
    return response.status(401).json({
      error: 'token expired'
    })
  }

  next(error)
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler
}