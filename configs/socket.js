const io = require('socket.io')(4000, {
    cors: {
        origin: ["http://localhost:3000"],
    },
})

let jugadoresEspera = []

io.on('connection', socket => {  
    jugador = jugadoresEspera.pop()
    if(!jugador){
        jugadoresEspera.push(socket.id)
    }
    else{
        console.log("Jugadores conectados")
        console.log(socket.id)
        console.log(jugador)
        //Enviamos a los jugadores su oponente
        socket.emit('getOpponent', jugador)
        socket.to(jugador).emit('getOpponent', socket.id)
    }
    
    socket.on('sendGameMove', (move, opponent) =>{
        //Enviamos movimiento al oponente
        socket.to(opponent).emit('getGameMove', move)
    })
})

//Mensaje de movimiento
    //Se ver de que pareja de jugadores pertenece, asi que se lo mando al otro


//socket.to(opponent).emit("",)//Cada socket esta en un room, su id

//Heartbeat
