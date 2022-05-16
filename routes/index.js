const express = require('express')
const router = express.Router()
const myPassport = require('../configs/passport')
const User = require('../models/user')

//  router.get('/', myPassport.checkAuthenticated, (req, res) => {
//     console.log("Listado amigos")
//     console.log(req.query.nickname)
//     let amigos = User.getFriends(req.body.Nickname)
//     res.send(amigos)
//  })
router.get('/', myPassport.checkAuthenticated, async  (req,res) => {
    console.log("Listado amigos")
    let amigos =  await User.getFriends(req.query.nickname)
    res.send(amigos)
})
module.exports = router