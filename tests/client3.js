const io = require("socket.io-client")
const socket = io("http://localhost:3002")

owner = "juan";
socket.on('connect',() =>{
    socket.emit('unirseTorneo', owner, process.argv.slice(2)[0])
})


socket.on('esperarJugadores',message =>{
    console.log("esperarJugadores")
    console.log(message)
})

socket.on('recibirOrden',message =>{
    console.log("recibirOrden")
})


function asd(){
    console.log("Enviando empezar")
    socket.emit('empezar', owner)
    
}
if(process.argv.slice(2)[0] == owner){
    setInterval(asd, 10*1000);
}