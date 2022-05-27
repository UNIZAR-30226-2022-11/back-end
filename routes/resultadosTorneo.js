const express = require('express')
const router = express.Router()
const myPassport = require('../configs/passport')
const Match = require('../models/match')

router.post('/', async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    console.log(req.query.codigo)
    res.send(await Match.ganadoresTorneo(req.body.ganador,req.body.segundo))
})
module.exports = router