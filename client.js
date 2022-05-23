const io = require("socket.io-client")
const socket = io("http://localhost:3000")

opponent = "";
socket.on('connect',() =>{
    //console.log(socket.connected);
    nickname = process.argv.slice(3)[0]
    gameMode = "3"
    socket.emit('buscarPartida', nickname, gameMode)
})


socket.on('getOpponent', message => {
    //opponent = message.id
    console.log("Recivido oponente "+ opponent + " cuyo nickname es " + message.opNick)
    //console.log(opponent)
})

socket.on('getGameMove', message => {
    console.log("Movimiento recivido " + message)
})
socket.on('oponenteDesconectado', message => {
    console.log("OponenteDesconectado" + message)
})

function asd(){
    move = "34-55"
    console.log("Enviando movimiento: " + move + " a " + opponent)
    socket.emit('sendGameMove', move, opponent)
    
}
if(process.argv.slice(2)[0] != 0){
    setInterval(asd, 10*1000);
}





/*socket.on('RespuestaConexion', message => {
    console.log("RespuestaConexion recivido " + message)
})

//Comprobar conexion
function comprobar(){
    console.log("Enviando ComprobarConexion")
    socket.emit('ComprobarConexion')
    
}
if(process.argv.slice(2)[0] != 0){
    setInterval(comprobar, 5*1000);
}*/