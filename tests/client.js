const io = require("socket.io-client")
const socket = io("http://localhost:3000")

opponent = "";
socket.on('connect',() =>{
    socket.emit('buscarPartida', process.argv.slice(3)[0], process.argv.slice(5)[0], "Avatar",process.argv.slice(4)[0])
})


socket.on('getOpponent', message => {
    opponent = message.opNick
    if(message.load){
        console.log("Hay que recuperar el tablero")
        console.log(message.board)
    }
    console.log("Recivido oponente "+ message.opNick)
    console.log("Side: " + message.side)
    console.log("Avatar: " + message.avatar)
})

socket.on('getGameMove', message => {
    console.log("Movimiento recivido " + message)
})
socket.on('oponenteDesconectado', message => {
    console.log("OponenteDesconectado" + message)
})

socket.on('enviarTablero', message => {
    console.log("enviarTablero" + message)
    let tablero = [
        [
            "salmon",
            "halibut",
        ],
        [
            "coral",
            "reef",
        ]
    ];
    socket.emit('recibirTablero', 0, tablero, 0, 0)
})

function asd(){
    move = "34-55"
    console.log("Enviando movimiento: " + move + " a " + opponent)
    socket.emit('sendGameMove', move)
    
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