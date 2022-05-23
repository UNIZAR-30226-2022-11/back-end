/*const io = require('socket.io')(4000, {
    cors: {
        origin: ["http://localhost:4200"],
    },
})*/
const io = require('socket.io')()

//let jugadoresEspera = []
let oponentes = new Map() //Clave: nickname1    Valor: nickname2
let nicknames = new Map() //Clave: socketId     Valor: nickname
let sockets = new Map() //Necesitamos sacar socket de oponente, es decir Clave: nickname Valor: socket
let timeouts = new Map()
let espera3 = []
let espera10 = []
let espera30 = []
let esperaNoTiempo = []



io.on('connection', socket => {  
    console.log('new connection');
    console.log(socket.id)
    
    socket.on('buscarPartida', (nickname, gameMode) => {
        let jugador

        nicknames.set(socket.id, nickname)
        sockets.set(nickname, socket.id)
        //Ver si jugador esta en partida activa
        if(oponentes.get(nickname)){
            

            //Le mandaras el getOpponent cuando tengas el tablero
            clearTimeout(timeouts.get(nickname)); //Se elimina el timeout
            timeouts.delete(nickname)

        }
        else{
            //Ver si nickname
            //oponentes.get(nickname)
            //si esta (a llegado antes de los 20s)
                //cambiar la entrada de oponentes (ojo no se añada en vez de eliminar la anterior)
            //si no

            switch (gameMode){
                case "3":
                    jugador = espera3.pop()
                    if(!jugador){
                        espera3.push(nickname)
                        //nicknames.set(id, nickname)
                    }
                    break
                case "10":
                    jugador = espera10.pop()
                    if(!jugador){
                        espera10.push(nickname)
                        //nicknames.set(id, nickname)
                    }
                    break
                case "30":
                    jugador = espera30.pop()
                    if(!jugador){
                        espera30.push(nickname)
                        //nicknames.set(id, nickname)
                    }
                    break
                case "NT":
                    jugador = esperaNoTiempo.pop()
                    if(!jugador){
                        esperaNoTiempo.push(nickname)
                        //nicknames.set(id, nickname)
                    }
                    break
                default:
                    console.log("Modo de juego no reconocido")
                    break
            }
                
            if(jugador){
                console.log("Jugadores conectados")
                console.log(nickname)
                console.log(jugador)

                oponentes.set(nickname, jugador)
                oponentes.set(jugador, nickname)

                
                socket.emit('getOpponent', { opNick: jugador, side: 0 })
                socket.to(sockets.get(jugador)).emit('getOpponent', { opNick: nickname, side: 1 })
            }
        }
    })
    
    socket.on('sendGameMove', (moveFI, moveCI, moveFF, moveCF) =>{
        //Enviamos movimiento al oponente
        console.log("Ha llegado sendGameMove, enviando movimiento: " +moveFI + ", " + moveCI + ", ", moveFF + ", ", moveCF + " a jugador " + oponentes.get(nicknames.get(socket.id)))
        socket.to(sockets.get(oponentes.get(nicknames.get(socket.id)))).emit('getGameMove', { fI: moveFI, cI: moveCI, fF: moveFF, cF: moveCF })
    })

    socket.on('sendMessage', (message) =>{
        //Enviamos movimiento al oponente
        console.log("Ha llegado sendMessage, enviando mensaje: " + message + " a jugador " + oponentes.get(socket.id))
        socket.to(sockets.get(oponentes.get(nicknames.get(socket.id)))).emit('getMessage', { msg: message })
    })


    /*socket.on('ComprobarConexion', (msg) => {
        console.log("Ha llegado ComprobarConexion")
        
        console.log(io.sockets.adapter.rooms)
        //Oponente
        let oponente = oponentes.get(socket.id)
        let vivo = io.sockets.adapter.rooms.get(oponente)
        if(typeof vivo == 'undefined'){
            socket.emit('RespuestaConexion', { res: false })
        }
        else{
            socket.emit('RespuestaConexion', { res: true })
        }
        
        
        //socket.to(opponent).emit('RespuestaConexion');
    })*/

    function isAlive(player){
        console.log("isAlive")
        
        let op = oponentes.get(player)
        //Eliminar del map ambas entradas
        oponentes.delete(op)
        oponentes.delete(player)
        //Enviar a op que usuario desconectado
        socket.to(sockets.get(op)).emit('oponenteDesconectado');
        //Eliminar entradas sockets y nicknames de op, partida a acabado
    }

    socket.on("disconnecting", () => {
        console.log("disconnecting")
        //console.log("Se desconecta " + socket.rooms[0])
        //console.log(socket.rooms)
        //console.log(oponentes.get(socket.rooms))

        /*socket.rooms.forEach((value) => {
            socket.to(sockets.get(oponentes.get(nicknames.get(value)))).emit('oponenteDesconectado');
            /*console.log(value)
            setTimeout(function(value){
                console.log(value);
            }, 2000);
            //Borrar de nicknames y sockets
            
            
            console.log("value " + value)
        });
        console.log("socket " + socket.id)*/
        //console.log(oponentes.size);
        //Enviar a oponente
        
        //console.log(socket.rooms); // the Set contains at least the socket ID


        //socket.to(sockets.get(oponentes.get(nicknames.get(socket.id)))).emit('oponenteDesconectado');
        let nick = nicknames.get(socket.id)
        sockets.delete(nick)
        nicknames.delete(socket.id)
        
        const timeoutId = setTimeout(isAlive, 20000, nick)
        timeouts.set(nick, timeoutId)
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
