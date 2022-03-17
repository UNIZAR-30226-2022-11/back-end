
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
  var sql = "insert into usuario values(Nickname,contraseña)"
  con.query(sql, function (err, result) {
    if (err) throw err;
     console.log("1 record inserted");
   });
  console.log(users)
};

User.getUserByNickname = (_nickname, result) => {
  var sql =`SELECT * FROM usuario WHERE Nickname = "${_nickname}"`
  con.query(sql, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log("found user: ", res[0]);
      result(null, res);
      return;
    }
    // not found Tutorial with the id
  // result({ kind: "not_found" }, null);
  });
};
  
module.exports = User;