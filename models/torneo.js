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
        var sql = "DELETE FROM torneo WHERE Nickname = \"" + nickname + "\" "
        if(!isObjEmpty(result)){
            return true
        }
        else{
            return false
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