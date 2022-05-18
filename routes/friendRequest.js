const express = require('express')
const router = express.Router()
const myPassport = require('../configs/passport')
const User = require('../models/user')

//Devuelve solicitudes de amistad pendiente del usuario
router.get('/', async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    //console.log("Se van ha devolver la solicitudes pendientes del usuario "+ req.query.nickname)
    let respuesta = {"friendRequests":await User.getFriendsRequests(req.query.nickname)}
    res.send(respuesta)
})

//Añade al usuario amigo la solicitud de amistad de nickname
router.post('/', async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    //console.log("Se va a enviar una solicitud de amistad del usuario "+ req.body.nickname + " a el usuario "+ req.body.amigo)
    //res.send("{resultado:" + await User.addToFriendsRequests(req.body.nickname, req.body.amigo)+"}");
    respuesta = {
        "resultado": await User.addToFriendsRequests(req.body.nickname, req.body.amigo)
    }
    res.send(respuesta)
})

module.exports = router