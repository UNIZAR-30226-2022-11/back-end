const express = require('express')
const router = express.Router()
const myPassport = require('../configs/passport')
const User = require('../models/user')

router.post('/', async (req, res) => {
    console.log(req.body.nickname, req.body.amigo)
    res.setHeader('Content-Type', 'application/json');
    respuesta = {
        "exito": await User.updateObjets(req.body.nickname, req.body.pieces,"piezas")
    }
    res.send(respuesta)
})
module.exports = router