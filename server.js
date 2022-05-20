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
const friendList = require('./routes/friendList')
const friendRequestRouter = require('./routes/friendRequest')
const acceptFriendRequestRouter = require('./routes/acceptFriendRequest')
const declineFriendRequestRouter = require('./routes/declineFriendRequest')
const getMatchHistory = require('./routes/getMatchHistory')
const matchHistoryRouter = require('./routes/matchHistory')
const saveMatchResultRouter = require('./routes/saveMatchResult')
const getCoinsRouter = require('./routes/getCoins')

const getPointsRouter = require('./routes/getPoints')
const getRankingList = require('./routes/getRankingList')
const buyItemRouter = require('./routes/buyItem')
const getShopRouter =require('./routes/getShop')
const ShopRouter = require('./routes/shop')
const getInventoryRouter =require('./routes/getInventory')
const inventoryRouter = require('./routes/inventory')
const coins = require('./routes/coins')
const points = require('./routes/points')
const updateTableroRouter = require('./routes/updateTable')
const updateAvatarRouter = require('./routes/updateAvatar')
const updatePiecesRouter = require('./routes/updatePieces')
const logOutRouter = require('./routes/logout')



app.use(indexRouter)
app.use('/login', loginRouter)
app.use('/register', registerRouter)
app.use('/getFriendList',getFriendsRouter)
app.use('/friendList',getFriendsRouter)
app.use('/getFriendRequest', friendRequestRouter)
app.use('/acceptFriendRequest',acceptFriendRequestRouter)
app.use('/declineFriendRequest',declineFriendRequestRouter)
app.use('/matchHistory',matchHistoryRouter)
app.use('/getMatchHistory',getMatchHistory)
app.use('/saveMatchResult',saveMatchResultRouter)
app.use('/coins',coins)
app.use('/points',points)
app.use('/getCoins',getCoinsRouter)
app.use('/getPoints',getPointsRouter)
app.use('/getRankingList',getRankingList)
app.use('/buyItem',buyItemRouter)
app.use('/getShop',getShopRouter)
app.use('/shop',ShopRouter)
app.use('/inventory',inventoryRouter)
app.use('/getInventory',getInventoryRouter)
app.use('/logOut',logOutRouter)

app.use('/updateAvatar',updateAvatarRouter)
app.use('/updateTable',updateTableroRouter)
app.use('/updatePieces',updatePiecesRouter)

const server = app.listen(process.env.PORT || 3000)

io.attach(server);

module.exports = { app, server }


