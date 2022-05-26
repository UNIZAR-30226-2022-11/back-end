const io = require('socket.io')(3001, {
    cors: {
        origin: ["http://localhost:4200"],
    },
})

let sockets = new Map()
let nicknames = new Map()
let partida = new Map()

io.on('connection', socket => {  
    console.log('new connection peticiones');
    console.log(socket.id)
    let intervalId

    socket.on('conectarse', (nickname) =>{
        sockets.set(nickname, socket.id)
        nicknames.set(socket.id, nickname)

        intervalId = setInterval(function() {
            let concectados = []
            for (let key of sockets.keys()) {
                if(partida.get(key)){
                    concectados.push({ nickname: key, partida: 1 })
                }
                else{
                    concectados.push({ nickname: key, partida: 0 })
                }
            }

            socket.emit('usuariosConectados', { usuarios: concectados })
        }, 3000);
    })

    socket.on('ingame', (nickname) =>{
        console.log("ingame")
        partida.set(nickname, 1)
    })

    socket.on('inviteFriend', (nickname, friend) =>{
        console.log("inviteFriend")

        socket.to(sockets.get(friend)).emit('getGameInvites', { nick: nickname })
    })

    socket.on('confirmGameFriend', (nickname, friend) =>{
        console.log("inviteFriend")

        socket.to(sockets.get(friend)).emit('getFriendOpponent', { nick: nickname })
    })

    socket.on("disconnecting", () => {
        console.log("disconnecting")
        clearInterval(intervalId)
        
        //Eliminar info de los maps
        console.log(nicknames.get(socket.id))
        sockets.delete(nicknames.get(socket.id))
        partida.delete(nicknames.get(socket.id))
        nicknames.delete(socket.id)
    })
})

module.exports = io