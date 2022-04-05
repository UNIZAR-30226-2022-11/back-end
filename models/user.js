var con = require('../configs/database')

// constructor
class User {
  constructor(user) {
    this.nickname = user.nickname;
    this.password = user.password;
    this.puntos = user.puntos;
    this.monedas = user.monedas;
    this.avatar = user.avatar;
    this.piezas = user.piezas;
    this.tablero = user.tablero;
  }
  static create(_nickname, _password, result) {
    var sql = "insert into usuario(Nickname,contraseña,puntos,monedas,avatar,piezas,tablero) values (\"" +
      _nickname + "\", \"" +
      _password + "\", " +
      "0, 0, 0, 0, 0);";
    con.query(sql, function (err, result) {
      if (err)
        throw err;
    });
  }
  static async getUserByNickname(_nickname, result) {
    var sql = "SELECT * FROM usuario WHERE Nickname = \"" + _nickname + "\"";
    let rows = await query(sql);

    const user = new User({
      nickname: rows[0].Nickname,
      password: rows[0].contraseña
    });

    return user;
  }
}

let query = function( sql, values ) {
  // devolver una promesa
return new Promise(( resolve, reject ) => {
 
 con.query(sql,(err, res) => {
  if ( err ) {
    if (err) throw err;
    reject( err )
  } else {
    resolve( res )
  }
});
})
}


  
module.exports = User;