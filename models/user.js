const e = require('express');
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

  static async delete_user(_nickname) {
    console.log("Se va a borrar al usuario "+_nickname)

    await query("DELETE FROM amigos WHERE USUARIO_Nickname = \"" + _nickname + "\" OR valor = \"" + _nickname + "\"")
    await query("DELETE FROM peticiones_amigos WHERE USUARIO_Nickname = \"" + _nickname + "\" OR valor = \"" + _nickname + "\"")
    await query("DELETE FROM juega WHERE USUARIO_Nickname = \"" + _nickname + "\"")
    //Creo que falta de alguna tabla
    await query("DELETE FROM usuario WHERE Nickname = \"" + _nickname + "\"")
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
    console.log(user)
    console.log(friend)
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
  static async addFriend(user,friend){
    console.log("Se va a intentar añadir al usuario " + friend + " como amigo de " + user)
    let existeUser = await this.getUserByNickname(user)
    let existeFriend = await this.getUserByNickname(friend)
    console.log(existeUser)
    if(existeFriend != null && existeUser != null ){
      console.log("entra")
      let queryEsAmigo = "SELECT * FROM amigos WHERE USUARIO_Nickname = \"" + user + "\" AND valor=\"" + friend + "\"";
      let esAmigo = await query(queryEsAmigo)
      if(isObjEmpty(esAmigo)){
          let queryAddFriend1 = "INSERT INTO amigos (valor, USUARIO_Nickname) VALUES (\""+user+"\", \""+friend+"\") ;"
          let queryAddFriend2 = "INSERT INTO amigos (USUARIO_Nickname,valor) VALUES (\""+user+"\", \""+friend+"\") ;"
          let esAmigo = await query(queryAddFriend1)
          let esAmigo1 = await query(queryAddFriend2)
          return "Se ha anyadido corectamente"
      }
      else{
        return "El amigo ya es amigo tuyo"
      }
    }
    else{
      return "Alguno de los usuarios no existe"
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