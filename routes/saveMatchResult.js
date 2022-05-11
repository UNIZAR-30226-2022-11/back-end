const express = require('express')
const router = express.Router()
const myPassport = require('../configs/passport')
const Match = require('../models/match')
const User = require('../models/match')

router.post('/', async (req, res) => {
    console.log(req.body.nickname, req.body.amigo)
    res.setHeader('Content-Type', 'application/json');
    respuesta = {
        "exito": await Match.saveMatch(req.body.nickname, req.body.rival,req.body.result)
    }
    res.send(respuesta)
})
module.exports = router