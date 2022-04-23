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
    let vacio = isObjEmpty(rows)
    if (vacio == false){
      console.log(rows)
      const user = new User({
        nickname: rows[0].Nickname,
        password: rows[0].contraseña,
        puntos: rows[0].puntos,
        monedas: rows[0].monedas,
        avatar: rows[0].avatar,
        piezas: rows[0].piezas,
        tablero: rows[0].tablero
      });
      return user;
    }
    else{
      return null
    }
  }
  static async getFriends(nickname){
    //var sql1= "insert into amigos(valor,USUARIO_Nickname) values ("jorge","pedroaibar23")"
    //await query(sql1)
    console.log(nickname)
    var sql = "SELECT valor FROM amigos WHERE USUARIO_Nickname = \"" + nickname + "\" "
    let rows  = await query(sql)
    let vacio = isObjEmpty(rows)
    
    if(!vacio){
      let amigos = {
        "nickname" : rows[0].valor
      }
      console.log(amigos)
      return rows
    }
    else{
      return null
    }
  }

  static async getFriendsRequests(nickname){
    var sql = "SELECT valor FROM peticiones_amigos WHERE USUARIO_Nickname = \"" + nickname + "\" "
    let rows  = await query(sql)
    
    if(!isObjEmpty(rows)){
      var response = []
      for(var i = 0; i < rows.lenght; i++){
        response.push({
          value: rows[i].valor
        })
      }
      return rows
    }
    else{
      return null
    }
    
  }

  static async addToFriendsRequests(user, friend){//Si ya tiene una solicitud pendiente tuya????
    var sql = "SELECT * FROM usuario WHERE Nickname = \"" + user + "\" "
    let result  = await query(sql)
    
    if(!isObjEmpty(result)){
      sql = "SELECT * FROM usuario WHERE Nickname = \"" + friend + "\" "
      result  = await query(sql)
      if(!isObjEmpty(result)){
        sql = "SELECT * FROM amigos WHERE USUARIO_Nickname = \"" + user + "\" AND valor=\"" + friend + "\""
        result  = await query(sql)
        console.log(result)
        if(!isObjEmpty(result)){
          return "El usuario existe pero ya es amigo tuyo"
        }
        else{
          sql = "INSERT INTO peticiones_amigos (valor, USUARIO_Nickname) VALUES (\""+user+"\", \""+friend+"\");"
          result  = await query(sql)
          console.log("Enviada solicitud de amistad")
          return "La solicitud se ha mandado correctamente"
        }
      }
      else{
        return "El amigo no existe"
      }
    }
    else{
      return "El usuario no existe"
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