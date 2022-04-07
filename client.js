const io = require("socket.io-client")
const socket = io("http://localhost:4000")

opponent = "";
socket.on('connect',() =>{
})


socket.on('getOpponent', message => {
    opponent = message
    console.log("Recivido oponente")
    console.log(opponent)
})

socket.on('getGameMove', message => {
    console.log("Movimiento recivido " + message)
})


function asd(){
    move = "34-55"
    console.log("Enviando movimiento: " + move + " a " + opponent)
    socket.emit('sendGameMove', move, opponent)
    
}
if(process.argv.slice(2)[0] != 0){
    setInterval(asd, 10*1000);
}
