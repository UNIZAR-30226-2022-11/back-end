const express = require('express')
const router = express.Router()
const myPassport = require('../configs/passport')
const Torneo = require('../models/torneo')

router.post('/', async (req, res) => {
    console.log(req.body.nickname, req.body.amigo)
    res.setHeader('Content-Type', 'application/json');
    respuesta = {
        "exito": await Torneo.entrarTorneo(req.body.nickname)
    }
    res.send(respuesta)
})
module.exports = router