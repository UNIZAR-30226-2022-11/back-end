
/*const mongoose = require('mongoose');

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

module.exports = mongoose.model('User', userSchema)*/
var con = require('../configs/database')

//const sql = require("./db.js");
const users = []
// constructor
const User = function(user) {
  this.id = user.id;
  this.nickname = user.nickname;
  this.password = user.password;
  this.puntos = user.puntos;
};
User.create = (newUser, result) => {
  users.push({
    id: newUser.id,
    nickname: newUser.nickname,
    password: newUser.password
  })
  console.log(users)
};
User.getUserByNickname = (_nickname) => {
  var sql = "SHOW TABLES;";
  con.query(sql, function (err, result) {
   if (err) throw err;
    console.log("1 record inserted");
  });
  return users.find(user => user.nickname === _nickname)
  
};
User.getUserById = (_id) => {
  return users.find(user => user.id === _id)
};
module.exports = User;