
const mongoose = require('mongoose');

// User Schema
const userSchema = new mongoose.Schema({
  nickname: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  puntos: {
    type: Number,
    required: true
  }
})

module.exports = mongoose.model('User', userSchema)