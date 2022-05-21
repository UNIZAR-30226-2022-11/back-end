
const express = require('express')
const router = express.Router()
const passport = require('passport')
const myPassport = require('../configs/passport')
const User = require('../models/user')

router.post('/', function(req, res){
    let random = req.logout();
    let respuesta = {"exito": true}
    res.send(respuesta)
  });


module.exports = router


