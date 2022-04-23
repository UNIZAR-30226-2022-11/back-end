const express = require('express')
const router = express.Router()
const myPassport = require('../configs/passport')
const User = require('../models/user')

//Devuelve solicitudes de amistad pendiente del usuario
router.get('/', async (req, res) => {
    //console.log("Se van ha devolver la solicitudes pendientes del usuario "+ req.query.nickname)
    res.send(await User.getFriendsRequests(req.query.nickname))
})

//Añade al usuario amigo la solicitud de amistad de nickname
router.post('/', async (req, res) => {
    //console.log("Se va a enviar una solicitud de amistad del usuario "+ req.body.nickname + " a el usuario "+ req.body.amigo)
    res.send(await User.addToFriendsRequests(req.body.nickname, req.body.amigo));
})

module.exports = router