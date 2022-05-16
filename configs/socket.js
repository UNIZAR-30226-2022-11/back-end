/*const io = require('socket.io')(4000, {
    cors: {
        origin: ["http://localhost:4200"],
    },
})*/
const io = require('socket.io')()

let jugadoresEspera = []

io.on('connection', socket => {  
    console.log('new connection');
    jugador = jugadoresEspera.pop()
    if(!jugador){
        jugadoresEspera.push(socket.id)
    }
    else{
        console.log("Jugadores conectados")
        console.log(socket.id)
        console.log(jugador)
        //Enviamos a los jugadores su oponente
        socket.emit('getOpponent', { id: jugador, side: 0})
        socket.to(jugador).emit('getOpponent', { id: socket.id, side: 1})
    }
    
    socket.on('sendGameMove', (opponent, moveFI, moveCI, moveFF, moveCF) =>{
        //Enviamos movimiento al oponente
        console.log("Ha llegado sendGameMove, enviando movimiento: " +moveFI + ", " + moveCI + ", ", moveFF + ", ", moveCF + " a jugador " + opponent)
        socket.to(opponent).emit('getGameMove', { op: opponent, fI: moveFI, cI: moveCI, fF: moveFF, cF: moveCF})
    })

    socket.on('sendMessage', (opponent, message) =>{
        //Enviamos movimiento al oponente
        console.log("Ha llegado sendMessage, enviando mensaje: " + message + " a jugador " + opponent)
        socket.to(opponent).emit('getMessage', { msg: message })
    })
})

module.exports = io

//Mensaje de movimiento
    //Se ver de que pareja de jugadores pertenece, asi que se lo mando al otro


//socket.to(opponent).emit("",)//Cada socket esta en un room, su id

//Heartbeat
