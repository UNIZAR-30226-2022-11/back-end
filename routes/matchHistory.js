const express = require('express')
const router = express.Router()
const myPassport = require('../configs/passport')
const User = require('../models/user')

router.get('/', async (req, res) => {
    console.log(req.query.nickname)
    res.setHeader('Content-Type', 'application/json');
    respuesta = {
        "resultado": await User.matchHistory(req.query.nickname)
    }
    res.send(respuesta)
})
module.exports = router