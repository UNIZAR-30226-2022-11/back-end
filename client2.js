const io = require("socket.io-client")
const socket = io("http://localhost:3001")

opponent = "";
socket.on('connect',() =>{
    console.log(socket.connected);
})

