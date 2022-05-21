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
      //console.log(rows)
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
          sql = "INSERT INTO peticiones_amigos (USUARIO_Nickname,valor ) VALUES (\""+user+"\", \""+friend+"\");"
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
  static async acceptFriendRequest(user,friend){
    console.log("Se va a intentar aceptar la solicitud de amistad de " + friend + " como amigo de " + user)
    
    let existePeticion = await this.getFriendsRequests(user)
    if(existePeticion != null ){
          let queryAddFriend1 = "INSERT INTO amigos (valor, USUARIO_Nickname) VALUES (\""+user+"\", \""+friend+"\") ;"
          let queryAddFriend2 = "INSERT INTO amigos (USUARIO_Nickname,valor) VALUES (\""+user+"\", \""+friend+"\") ;"
          let queryDeleteRequest = "DELETE FROM peticiones_amigos WHERE USUARIO_Nickname = \"" + user + "\" "
          let deleteRequest = await query(queryDeleteRequest)
          let esAmigo = await query(queryAddFriend1)
          let esAmigo1 = await query(queryAddFriend2)
          return true
    }
      else{
        return false
     
    }
  }
  static async declineFriendRequest(user,friend){
    let existePeticion = await this.getFriendsRequests(user)
    if(existePeticion != null ){
      let queryDeleteRequest = "DELETE FROM peticiones_amigos WHERE USUARIO_Nickname = \"" + user + "\" AND valor=\"" + friend + "\"" 
      let deleteRequest = await query(queryDeleteRequest)
      return true
    } 
    else {
      return false
    }

  }
  static async getCoins(nickname){
    var coinsQuery = "SELECT monedas FROM usuario WHERE Nickname = \"" + nickname + "\" "
    const coins = await query(coinsQuery)
    if(!isObjEmpty(coins)){
      console.log(coins)
      let valor = coins[0].monedas
      console.log(valor)
      let  monedas = {
        "coins" : valor
      }
      return monedas
    }
    else{
      let fracaso = {
        "exito" : false
      }
      return fracaso
    }
  }
  static async getPoints(nickname){
    var pointsQuery = "SELECT puntos FROM usuario WHERE Nickname = \"" + nickname + "\" "
    const points = await query(pointsQuery)
    if(!isObjEmpty(points)){
      console.log(points)
      let valor = points[0].puntos
      console.log(valor)
      let  monedas = {
        "points" : valor
      }
      return monedas
    }
    else{
      let fracaso = {
        "exito" : false
      }
      return fracaso
    }
  }
  static async getRankingList(nickname){
    var getRankingListTopQuery = "SELECT Nickname,puntos FROM usuario WHERE Nickname IN(SELECT valor FROM amigos WHERE USUARIO_Nickname=\"" + nickname + "\") GROUP BY Nickname ORDER BY puntos DESC LIMIT 3";
    var getRankingListBottomQuery = "SELECT Nickname,puntos FROM usuario WHERE Nickname IN(SELECT valor FROM amigos WHERE USUARIO_Nickname=\"" + nickname + "\") GROUP BY Nickname ORDER BY puntos LIMIT 3";
    var getUser = "SELECT Nickname,puntos FROM usuario WHERE Nickname = \"" + nickname + "\" "
    let listTop = await query(getRankingListTopQuery)
    let listBottom = await query(getRankingListBottomQuery)
    let listUser = await query(getUser)
    console.log(listTop[1])
    let respuesta = [
      listTop[0],listTop[1],listTop[2],
      listUser[0],listBottom[2],listBottom[1],
      listBottom[0]
    ]
    console.log(respuesta)
    return respuesta
  }
  //Funcion para actualizar el avatar,tablero o pieza de un usuario
  static async updateObjets(nickname,name,type){
    if(type == "avatar"){
      console.log("Actualizando avatar...")
      let updateAvatar = "UPDATE usuario SET avatar= \"" + name + "\" WHERE Nickname = \"" + nickname + "\" "
      let update = await query(updateAvatar)
      return true
    }
    else if ( type == "tablero") {
      let updateTablero = "UPDATE usuario SET tablero= \"" + name + "\" WHERE Nickname = \"" + nickname + "\" "
      let update = await query(updateTablero)
      return true
    }
    else if (type == "piezas" ){
      let updatePiezas = "UPDATE usuario SET piezas= \"" + name + "\" WHERE Nickname = \"" + nickname + "\" "
      let update = await query(updatePiezas)
      return true
    }
    return false
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