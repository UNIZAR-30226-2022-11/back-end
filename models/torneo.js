var con = require('../configs/database')

class Torneo {  
    static async crearTorneo(nickname,codigo){
       var sql = "INSERT INTO torneo (creador ,codigo,jugadores) VALUES (\""+nickname+"\", \""+codigo+"\",1);"
       let result  = await query(sql);
       console.log(result)
       if(!isObjEmpty(result)){
           return true
       }
       else{
           return false
       }
       
    }
    static async borrarTorneo(nickname){
        var sql = "DELETE FROM torneo WHERE creador = \"" + nickname + "\" "
        let result  = await query(sql);
        if(!isObjEmpty(result)){
            return true
        }
        else{
            return false
        }
        
    }
    static async entrarTorneo(nickname){
        var sql = "SELECT jugadores FROM torneo WHERE creador = \"" + nickname + "\" "
        let result  = await query(sql);
        var jugadores = result[0].jugadores
        console.log(jugadores)
        if(!isObjEmpty(result)){
            if(jugadores < 4){
                jugadores++;
                console.log("Numero de jugadores " +  jugadores)
                sql=  "UPDATE torneo SET jugadores =  " + jugadores + "  WHERE creador = \"" + nickname + "\" "
                result  = await query(sql);
                return true
            }
            else{
                return false
            }
        }
        else{
            return false
        }
    }
    static async obtenerTorneosPublicos(){
        var sql = "SELECT creador,jugadores FROM torneo WHERE codigo = 0 "
        let result  = await query(sql);
        return result

    }
    static async comprobarCodigoTorneo(codigo){
        var sql = "SELECT creador FROM torneo WHERE codigo =  " + codigo
        let result  = await query(sql);
        if(!isObjEmpty(result)){
            var respuesta ={
                "exito": true,
                "creador": result[0].creador
            }
            return respuesta
        }
        else{
            var respuesta ={
                "exito": false,
                "creador": ""
            }
            return respuesta
        }
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

module.exports = Torneo;   