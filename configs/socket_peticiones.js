const io = require('socket.io')(3001, {
    cors: {
        origin: ["http://localhost:4200"],
    },
})

let sockets = new Map()

io.on('connection', socket => {  
    console.log('new connection peticiones');
    console.log(socket.id)

    socket.on('conectarse', (nickname) =>{
        sockets.set(nickname, socket.id)
    })

    socket.on('inviteFriend', (nickname, friend) =>{
        console.log("inviteFriend")

        socket.to(sockets.get(friend)).emit('getGameInvites', { nick: nickname })
    })

    socket.on('confirmGameFriend', (nickname, friend) =>{
        console.log("inviteFriend")

        socket.to(sockets.get(friend)).emit('getFriendOpponent', { nick: nickname })
    })
})

module.exports = io