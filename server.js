
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const app = express()
const passport = require('passport')
const myPassport = require('./configs/passport')

const flash = require('express-flash')
const session = require('express-session')
const user = require('./models/controller')


app.use(flash())
app.use(session({
  secret: 'r8q,+&1LM3)CD*zAGpx1xm{NeQhc;#',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60 * 60 * 10000 } // 1 hour
}));

app.use(passport.initialize())
app.use(passport.session())
myPassport.initialize(passport)

app.use(express.json()) //Asi en req.body podremos leer objeto json


const indexRouter = require('./routes/index')
const loginRouter = require('./routes/login')
const registerRouter = require('./routes/register')

app.use('/', indexRouter)
app.use('/login', loginRouter)
app.use('/register', registerRouter)

app.listen(5001)
