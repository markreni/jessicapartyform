const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const formSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  phoneNumber: {
    type: String,
    minLength: 6,
    required: true
  },
  dietaryRestrictions: {
    type: [String],
    required: true
  },
  other: String
})

formSchema.plugin(uniqueValidator, { message: 'Email already registered' })

formSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Form', formSchema)