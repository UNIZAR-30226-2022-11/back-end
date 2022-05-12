const express = require('express')
const router = express.Router()
const myPassport = require('../configs/passport')
const User = require('../models/user')

//Devuelve solicitudes de amistad pendiente del usuario
router.get('/', async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    //console.log("Se van ha devolver la solicitudes pendientes del usuario "+ req.query.nickname)
    let coins = await User.getRankingList(req.query.nickname)
    console.log(coins)
    res.send(coins)
})
module.exports = router