const { Schema, model } = require("mongoose");

const recipeSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name field is empty, please fill it up!']
  },
  description: {
    type: String,
    required: [true, 'Description field is empty, please fill it up!']
  },
  link: {
    type: String,
    required: [true, 'Link field is empty, please fill it up!']
  },
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = model('Recipe', recipeSchema)