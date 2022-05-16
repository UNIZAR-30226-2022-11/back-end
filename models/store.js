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
    //Funcion que devuelve todos los articulos de un usuario
    static async getInventory(nickname) {
      let getInventoryQuery =  "SELECT  ARTICULO_nombre FROM compra WHERE USUARIO_Nickname = \"" + nickname + "\" ";
      let articulos = await query(getInventoryQuery)
      return articulos;
    }
    //Funcion que devuelve los articulos en tienda que no tiene el usuario
    static async getShop(nickname){
      let getShopQuery = "SELECT nombre from articulo WHERE nombre NOT IN(SELECT  ARTICULO_nombre FROM compra WHERE USUARIO_Nickname = \"" + nickname + "\" )";
      let tienda = await query(getShopQuery)
      return tienda
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