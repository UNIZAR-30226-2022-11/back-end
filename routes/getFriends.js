const express = require('express')
const router = express.Router()
const myPassport = require('../configs/passport')
const User = require('../models/user')


router.get('/',async  (req,res) => {
    console.log("Listado amigos")
    let amigos ={ "friendList" : await User.getFriends(req.query.nickname)}
    res.send(amigos)
})
module.exports = router