var con = require('../configs/database')

class Store {  
    static async buyItem(nickname, nombre) {
      
      

      //ver si el usario ya tiene el objeto
      let sql = "SELECT * FROM compra WHERE USUARIO_Nickname = \"" + nickname + "\" AND ARTICULO_nombre = \"" + nombre + "\""
      let rows  = await query(sql)
      if(!isObjEmpty(rows)){
        console.log("El usuario ya tiene el objeto")
        return false
      }

      //ver si tiene suficientes monedas
      sql = "SELECT u.monedas, a.precio FROM articulo a, usuario u WHERE u.Nickname = \"" + nickname + "\" AND a.nombre = \"" + nombre + "\" AND u.monedas >= a.precio"
      rows  = await query(sql)
      if(isObjEmpty(rows)){
        console.log("El usuario no tiene suficientes monedas")
        return false
      }

      //quitar monedas
      let nuevo_monedas =  rows[0].monedas - rows[0].precio
      sql = "update usuario set monedas = \"" + nuevo_monedas + "\" where Nickname = \"" + nickname + "\""
      await query(sql)
      
      //añadir articulo
      sql = "INSERT INTO compra(USUARIO_Nickname,ARTICULO_nombre) VALUES (\"" + nickname + "\", \"" + nombre  + "\");"
      await query(sql)
    
      return true
    }
}

function isObjEmpty(obj) {
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) return false;
    }
  
    return true;
}

let query = function( sql, values ) {
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

module.exports = Store;