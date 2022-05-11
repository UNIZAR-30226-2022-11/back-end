if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const app = express()
const passport = require('passport')
const myPassport = require('./configs/passport')

//const flash = require('express-flash')
const session = require('express-session')
const cors = require('cors')
const io = require('./configs/socket')

app.use(cors())
app.use(session({
    secret: "secret",
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
const getFriendsRouter = require('./routes/getFriends')
const friendRequestRouter = require('./routes/friendRequest')
const acceptFriendRequestRouter = require('./routes/acceptFriendRequest')
const declineFriendRequestRouter = require('./routes/declineFriendRequest')
const matchHistoryRouter = require('./routes/matchHistory')
const saveMatchResultRouter = require('./routes/saveMatchResult')

app.use(indexRouter)
app.use('/login', loginRouter)
app.use('/register', registerRouter)
app.use('/getFriends',getFriendsRouter)
app.use('/friendRequest', friendRequestRouter)
app.use('/acceptFriendRequest',acceptFriendRequestRouter)
app.use('/declineFriendRequest',declineFriendRequestRouter)
app.use('/matchHistory',matchHistoryRouter)
app.use('/saveMatchResult',saveMatchResultRouter)
const server = app.listen(process.env.PORT || 3000)

io.attach(server);

module.exports = { app, server }


