const mongoose = require("mongoose")
const { Schema, model } = mongoose

dragonSchema = new Schema({
  name: {type: String},
  location: {type: String},
  kewlFactor: {
    type: Number,
    enum: [1, 2, 3, 4, 5]
  },
  image: {type: String}
})

const dragon = model('dragon', dragonSchema)
module.exports = dragon;