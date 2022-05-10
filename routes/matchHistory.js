const express = require('express')
const router = express.Router()
const myPassport = require('../configs/passport')
const Match = require('../models/match')

router.get('/', async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(await Match.getMatchHistory(req.query.nickname))
})

router.post('/', async (req, res) => {
    await Match.addMatch(req.body.nickname_1, req.body.nickname_2, req.body.ganador)
})

module.exports = router