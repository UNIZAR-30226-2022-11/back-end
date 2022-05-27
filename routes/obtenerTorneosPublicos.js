const express = require('express')
const router = express.Router()
const myPassport = require('../configs/passport')
const Torneo = require('../models/torneo')

router.get('/', async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(await Torneo.obtenerTorneosPublicos())
})
module.exports = router