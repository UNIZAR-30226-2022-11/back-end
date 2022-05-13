const express = require('express')
const router = express.Router()
const myPassport = require('../configs/passport')
const Store = require('../models/store')

router.post('/', async (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    respuesta = {
        "exito": await Store.buyItem(req.body.nickname, req.body.nombre)
    }
    res.send(respuesta)
})

module.exports = router