const express = require('express')
const router = express.Router()
const myPassport = require('../configs/passport')
const User = require('../models/user')

router.post('/', async (req, res) => {
    console.log(req.body.nickname, req.body.amigo)
    res.setHeader('Content-Type', 'application/json');
    respuesta = {
        "exito": await User.acceptFriendRequest(req.body.nickname, req.body.amigo)
    }
    res.send(respuesta)
})
module.exports = router