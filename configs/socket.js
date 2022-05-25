/*const io = require('socket.io')(4000, {
    cors: {
        origin: ["http://localhost:4200"],
    },
})*/
const io = require('socket.io')()

//let jugadoresEspera = []
let oponentes = new Map()   //Clave: nickname1  Valor: nickname2
let nicknames = new Map()   //Clave: socketId   Valor: nickname
let sockets = new Map()     //Clave: nickname   Valor: socketId
let timeouts = new Map()    //Clave: nickname   Valor: timeoutId
let avatars = new Map()    //Clave: nickname    Valor: avatar
let espera3 = []
let espera10 = []
let espera30 = []
let esperaNoTiempo = []



io.on('connection', socket => {  
    console.log('new connection');
    console.log(socket.id)
    
    socket.on('buscarPartida', (nickname, gameMode, avatar, friend) => {
        let jugador

        nicknames.set(socket.id, nickname)
        sockets.set(nickname, socket.id)
        avatars.set(nickname, avatar)

        //Ver si jugador esta en partida activa
        if(oponentes.get(nickname)){
            clearTimeout(timeouts.get(nickname)); //Se elimina el timeout
            timeouts.delete(nickname)

            //Enviar a oponente enviarTablero
            socket.to(sockets.get(oponentes.get(nickname))).emit('enviarTablero')

        }
        else{
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
                case "A":
                    if(sockets.get(friend)){ //El amigo ya esta
                        jugador = friend
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

                
                socket.emit('getOpponent', { opNick: jugador, side: 0, avatar: avatar, load: 0 })
                socket.to(sockets.get(jugador)).emit('getOpponent', { opNick: nickname, side: 1, avatar: avatar, load: 0 })
            }
        }
    })

    socket.on('recibirTablero', (lado, tablero, turno, timer1) =>{
        console.log("recibirTablero")
        //Añadir campo tablero en getOpponent
        socket.to(sockets.get(oponentes.get(nicknames.get(socket.id)))).emit('getOpponent', { opNick: oponentes.get(nicknames.get(socket.id)), side: lado, avatar: avatars.get(oponentes.get(nicknames.get(socket.id))), load: 1, board: tablero, turn: turno, t1: timer1 })
    })
    
    socket.on('sendGameMove', (moveFI, moveCI, moveFF, moveCF) =>{
        //Enviamos movimiento al oponente
        console.log("Ha llegado sendGameMove, enviando movimiento: " +moveFI + ", " + moveCI + ", ", moveFF + ", ", moveCF + " a jugador " + oponentes.get(nicknames.get(socket.id)))
        socket.to(sockets.get(oponentes.get(nicknames.get(socket.id)))).emit('getGameMove', { fI: moveFI, cI: moveCI, fF: moveFF, cF: moveCF })
    })

    socket.on('sendMessage', (message) =>{
        //Enviamos mensaje al oponente
        console.log("Ha llegado sendMessage, enviando mensaje: " + message + " a jugador " + oponentes.get(socket.id))
        socket.to(sockets.get(oponentes.get(nicknames.get(socket.id)))).emit('getMessage', { msg: message })
    })

    function isAlive(player){
        console.log("isAlive")
        
        let op = oponentes.get(player)
        //Eliminar del map ambas entradas
        oponentes.delete(op)
        oponentes.delete(player)
        //Enviar a op que usuario desconectado
        socket.to(sockets.get(op)).emit('oponenteDesconectado');
        //Eliminar entradas sockets y nicknames de op, partida a acabado
        nicknames.delete(sockets.get(op))
        sockets.delete(op)
        avatars.delete(op)
    }

    socket.on("disconnecting", () => {
        console.log("disconnecting")

        let nick = nicknames.get(socket.id)
        sockets.delete(nick)
        nicknames.delete(socket.id)
        avatars.delete(nick)
        
        const timeoutId = setTimeout(isAlive, 20000, nick)
        timeouts.set(nick, timeoutId)
    });
})

module.exports = io
