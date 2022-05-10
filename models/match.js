var con = require('../configs/database')

class Match {  
    static async getMatchHistory(nickname) {
        //rival, ganador, empate
        var sql = "SELECT Nickname_1,Nickname_2,ganador FROM partida WHERE Nickname_1 = \"" + nickname + "\" OR Nickname_2 = \"" + nickname + "\" LIMIT 20"
        let rows  = await query(sql)
        if(!isObjEmpty(rows)){
            //console.log(rows)
            let respuesta = []
            let rival, ganador, empate

            for (let i = 0; i < rows.length; i++){

                if(rows[i].Nickname_1 == nickname){
                    rival = rows[i].Nickname_2
                    ganador = !rows[i].ganador
                }
                else{
                    rival = rows[i].Nickname_1
                    ganador = rows[i].ganador
                }
                empate = rows[i].ganador == null

                respuesta.push({
                    "rival": rival,
                    "ganador": ganador,
                    "empate": empate
                })
            }
            //console.log(respuesta)
            return respuesta
        }
    }

    static async addMatch(nickname_1, nickname_2, ganador){
        var sql = "INSERT INTO partida(Nickname_1,Nickname_2,ganador) VALUES (\"" + nickname_1 + "\", \"" + nickname_2 + "\", " + ganador + ");"
        await query(sql)
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

module.exports = Match;