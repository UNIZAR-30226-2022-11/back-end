var con = require('../configs/database')
function isObjEmpty(obj) {
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) return false;
  }

  return true;
}
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
  static async create(_nickname, _password, result) {
    var comprobar = "SELECT * FROM usuario WHERE Nickname = \"" + _nickname + "\"";
    let rows = await query(comprobar);
    let vacio = isObjEmpty(rows)
    if(vacio == true){
      console.log("Entra aqui")
      var sql = "insert into usuario(Nickname,contraseña,puntos,monedas,avatar,piezas,tablero) values (\"" +
      _nickname + "\", \"" +
      _password + "\", " +
      "0, 0, 0, 0, 0);";
      console.log(result)
      await query(sql)
      return true
      
      
      
    }
    else{    
      return false 
    }
    
  }
  static async getUserByNickname(_nickname, result) {
    var sql = "SELECT * FROM usuario WHERE Nickname = \"" + _nickname + "\"";
    let rows = await query(sql);
    if(rows.hasOwnProperty()){
      const user = new User({
        nickname: rows[0].Nickname,
        password: rows[0].contraseña
      });
      return user;
    }
    else{
      return null
    }

   
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