if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const app = express()
const passport = require('passport')
const myPassport = require('./configs/passport')
const flash = require('express-flash')
const session = require('express-session')

app.use(flash())
app.use(session({
    secret: "process.env.SESSION_SECRET",
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())


app.use(express.json()) //Asi en req.body podremos leer objeto json
myPassport.initialize(passport)

const indexRouter = require('./routes/index')
const loginRouter = require('./routes/login')
const registerRouter = require('./routes/register')

app.use('/', indexRouter)
app.use('/login', loginRouter)
app.use('/register', registerRouter)

const WebSocket = require('ws');
const http = require('http');
const server = app.listen(3000)
// Creamos una instacia del servidor HTTP (Web)
// Creamos y levantamos un servidor de WebSockets a partir del servidor HTTP
const wss = new WebSocket.Server({ server });

// Escuchamos los eventos de conexión
wss.on('connection', function connection(ws) {
    // Escuchamos los mensajes entrantes
    ws.on('message', function incoming(data) {
        // Iteramos todos los clientes que se encuentren conectados
        wss.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN) {
                // Enviamos la información recibida
                client.send(data);
            }
        });
    });
});

// Levantamos servidor HTTP

console.log('Servidor funcionando. Utiliza ws://localhost:3000 para conectar.')

//Web Sockets
