const express = require('express')
const router = express.Router()
const myPassport = require('../configs/passport')
const User = require('../models/user')

//Devuelve solicitudes de amistad pendiente del usuario
router.get('/', async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    //console.log("Se van ha devolver la solicitudes pendientes del usuario "+ req.query.nickname)
    let board = await User.getBoard(req.query.nickname)
    console.log(board)
    res.send(board)
})
module.exports = router