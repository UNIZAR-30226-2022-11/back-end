const io = require('socket.io')(3002, {
    cors: {
        origin: ["http://localhost:4200"],
    },
})

let sockets = new Map()
let nicknames = new Map()
let torneos = new Map()

io.on('connection', socket => {  
    console.log('new connection torneos');
    console.log(socket.id)

    socket.on('unirseTorneo', (owner, nickname) =>{
        console.log("unirseTorneo")
        sockets.set(nickname, socket.id)
        nicknames.set(socket.id, nickname)

        if(!torneos.has(owner)){
            //Crear torneo
            torneos.set(owner, [nickname])
        }
        else{
            torneos.set(owner, [...torneos.get(owner), nickname],)
        }

        //Para cada miembro del torneo enviar un esperarJugadores
        let jugadores = torneos.get(owner)
        let mensaje = new Array(7).fill('');
        for(let i = 0; i < jugadores.length; i++){
            mensaje[i] = jugadores[i]
        }
        //console.log(mensaje)
        for(let i = 0; i < jugadores.length; i++){
            if(i == 4) break
            //console.log("Enviando esperarJugadores a " + jugadores[i])
            socket.to(sockets.get(jugadores[i])).emit('esperarJugadores', { j0: mensaje[0], j1: mensaje[1], j2: mensaje[2], j3: mensaje[3],
                                                                             j4: mensaje[4], j5: mensaje[5], j6: mensaje[6] })
        }
        //El anterior no funciona para si mismo por lo que se envia aqui
        socket.emit('esperarJugadores', { j0: mensaje[0], j1: mensaje[1], j2: mensaje[2], j3: mensaje[3],
            j4: mensaje[4], j5: mensaje[5], j6: mensaje[6] })
    })

    socket.on("empezar", (owner) => {
        let jugadores = torneos.get(owner)
        for(let i = 0; i < jugadores.length; i++){
            if(i == 4) break
            socket.to(sockets.get(jugadores[i])).emit('recibirOrden')
        }
        socket.emit('recibirOrden')
    })

    socket.on("eliminarTorneo", (owner) => {
        torneos.delete(owner)
    })

    
    socket.on("disconnecting", () => {
        console.log("disconnecting")
       
        
        //Eliminar info de los maps
        sockets.delete(nicknames.get(socket.id))
        nicknames.delete(socket.id)
    })
})

module.exports = io