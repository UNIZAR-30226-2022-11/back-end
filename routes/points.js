const express = require('express')
const router = express.Router()
const myPassport = require('../configs/passport')
const User = require('../models/user')

//Devuelve solicitudes de amistad pendiente del usuario
router.get('/', async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    //console.log("Se van ha devolver la solicitudes pendientes del usuario "+ req.query.nickname)
    res.send(await User.getPoints(req.query.nickname))
})
module.exports = router