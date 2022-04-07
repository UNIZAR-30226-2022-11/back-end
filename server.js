if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const app = express()
const passport = require('passport')
const myPassport = require('./configs/passport')

const flash = require('express-flash')
const session = require('express-session')

require('./configs/socket')

app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
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

app.listen(process.env.PORT || 3000)

