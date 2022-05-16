const express = require('express')
const router = express.Router()
const myPassport = require('../configs/passport')
const Store = require('../models/store')

//Devuelve solicitudes de amistad pendiente del usuario
router.get('/', async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    //console.log("Se van ha devolver la solicitudes pendientes del usuario "+ req.query.nickname)
    let articulo = { "articulos" : await Store.getInventory(req.query.nickname)}
    console.log(articulo)
    res.send(articulo)
})
module.exports = router