var con = require('../configs/database')

// constructor
const User = function(user) {
  this.Nickname = user.Nickname;
  this.contraseña = user.contraseña;
  this.puntos = user.puntos;
  this.monedas = user.monedas;
  this.avatar = user.avatar;
  this.piezas = user.piezas;
  this.tablero = user.tablero;
};

User.create = (newUser, result) => {
  
  //var sql1 = "INSERT INTO tutorials SET ?", newUser, (err, res) => 
  con.query("INSERT INTO usuario SET ?", newUser, (err, res) =>  {
    if (err) throw err;
    console.log("Nueva usuario")
    result(null, { nickname: res.insertNickname, ...newUser });
  });
};


User.findById = (Nickname, result) => {
  sql.query(`SELECT * FROM usuario WHERE Nickname = ${Nickname}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log("found tutorial: ", res[0]);
      result(null, res[0]);
      return;
    }
    // not found Tutorial with the id
    result({ kind: "not_found" }, null);
  });
};
User.getUserByNickname = (_nickname, result) => {

  var sql ="SELECT * FROM usuario WHERE Nickname = \"" + _nickname + "\""
  var user
  con.query(sql, (err, res) => {
    if (err) throw err;
    if (res.length) {
      user = res[0]
     // console.log(user);
     // console.log(user)
      return(null, user);
      
    }
    else{
      user = null
    }
  });
};
  
module.exports = User;
//export {getUserByNickname};