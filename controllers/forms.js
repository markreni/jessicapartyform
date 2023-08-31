const formRouter = require('express').Router()
const Form = require('../models/form')

// using express-async-errors library to pass errors automatically to errorHandler middleware
formRouter.get('/', async (request, response) => {
  const formData = await Form
    .find({})

  response.json(formData)
})

formRouter.post('/', async (request, response) => {
  const body = request.body

  const formData = new Form({
    firstName: body.firstName,
    lastName: body.lastName,
    email: body.email,
    phoneNumber: body.phoneNumber,
    dietaryRestrictions: body.dietaryRestrictions
  })

  const result = await formData.save()

  response.status(201).json(result)
})


module.exports =  formRouter