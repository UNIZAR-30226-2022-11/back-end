/*const io = require('socket.io')(4000, {
    cors: {
        origin: ["http://localhost:4200"],
    },
})*/
const io = require('socket.io')()

//let jugadoresEspera = []
let oponentes = new Map()
let nicknames = new Map()
let espera3 = []
let espera10 = []
let espera30 = []
let esperaNoTiempo = []


io.on('connection', socket => {  
    console.log('new connection');
    console.log(socket.id)
    
    /*jugador = jugadoresEspera.pop()
    if(!jugador){
        jugadoresEspera.push(socket.id)
    }
    else{
        console.log("Jugadores conectados")
        console.log(socket.id)
        console.log(jugador)

        oponentes.set(socket.id, jugador)
        oponentes.set(jugador, socket.id)
        //console.log(oponentes.size);
        //console.log(oponentes.get(jugador))
        //Enviamos a los jugadores su oponente
        socket.emit('getOpponent', { id: jugador, side: 0})
        socket.to(jugador).emit('getOpponent', { id: socket.id, side: 1})
    }*/
    socket.on('buscarPartida', (id, nickname, gameMode) => {
        let jugador
        switch (gameMode){
            case "3":
                jugador = espera3.pop()
                if(!jugador){
                    //console.log("Añadiendo " + id + " a espera3")
                    espera3.push(id)
                    nicknames.set(id, nickname)
                }
                break
            case "10":
                jugador = espera10.pop()
                if(!jugador){
                    espera10.push(id)
                    nicknames.set(id, nickname)
                }
                break
            case "30":
                jugador = espera30.pop()
                if(!jugador){
                    espera30.push(id)
                    nicknames.set(id, nickname)
                }
                break
            case "NT":
                jugador = esperaNoTiempo.pop()
                if(!jugador){
                    esperaNoTiempo.push(id)
                    nicknames.set(id, nickname)
                }
                break
            default:
                console.log("Modo de juego no reconocido")
                break
        }
            
        if(jugador){
            console.log("Jugadores conectados")
            console.log(socket.id)
            console.log(jugador)

            oponentes.set(id, jugador)
            oponentes.set(jugador, socket.id)

            
            socket.emit('getOpponent', { opNick: nicknames.get(jugador), side: 0 })
            socket.to(jugador).emit('getOpponent', { opNick: nickname, side: 1 })
        }
        
    })
    
    socket.on('sendGameMove', (moveFI, moveCI, moveFF, moveCF) =>{
        //Enviamos movimiento al oponente
        console.log("Ha llegado sendGameMove, enviando movimiento: " +moveFI + ", " + moveCI + ", ", moveFF + ", ", moveCF + " a jugador " + oponentes.get(socket.id))
        socket.to(oponentes.get(socket.id)).emit('getGameMove', { fI: moveFI, cI: moveCI, fF: moveFF, cF: moveCF })
    })

    socket.on('sendMessage', (message) =>{
        //Enviamos movimiento al oponente
        console.log("Ha llegado sendMessage, enviando mensaje: " + message + " a jugador " + oponentes.get(socket.id))
        socket.to(oponentes.get(socket.id)).emit('getMessage', { msg: message })
    })

    /*socket.on('ComprobarConexion', (opponent) => {
        console.log("ComprobarConexion")
        console.log(socket.rooms)
        /*console.log("Ha llegado ComprobarConexion")
        console.log(io.of("\"/" + opponent + "\"" ).adapter.rooms)
        console.log(io.of("\"/" + opponent  + "\"" ).adapter.sids)
        socket.to(opponent).emit('latido');
    })*/

    /*socket.on('RespuestaLatido', (opponent) => {
        console.log("Ha llegado ComprobarConexion")
        socket.to(opponent).emit('RespuestaConexion', { res: true });
    })*/

    socket.on("disconnecting", () => {
        console.log("disconnecting")
        //console.log("Se desconecta " + socket.rooms[0])
        //console.log(socket.rooms)
        //console.log(oponentes.get(socket.rooms))
        socket.rooms.forEach((value) => {
            socket.to(oponentes.get(value)).emit('oponenteDesconectado');
        });
        //console.log(oponentes.size);
        //Enviar a oponente
        
        //console.log(socket.rooms); // the Set contains at least the socket ID
    });


    /*setInterval(() => {
        socket.timeout(5000).emit('latido', (err) => {
            if (err) {
              // the client did not acknowledge the event in the given delay
            }
        });
    }, 100);*/
})

module.exports = io

//Mensaje de movimiento
    //Se ver de que pareja de jugadores pertenece, asi que se lo mando al otro


//socket.to(opponent).emit("",)//Cada socket esta en un room, su id

//Heartbeat
