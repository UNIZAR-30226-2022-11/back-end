const io = require("socket.io-client")
const socket = io("http://localhost:3001")

opponent = "";
socket.on('connect',() =>{
    socket.emit('conectarse', process.argv.slice(2)[0])
})

socket.on('usuariosConectados', message => {
    console.log("usuariosConectados")
    console.log(message)
})

if(process.argv.slice(3)[0] != 0){
    socket.emit('ingame', process.argv.slice(2)[0])
}