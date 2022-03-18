const express = require('express')
const router = express.Router()
//const User = require('../models/user')
const bcrypt = require('bcrypt')
const User = require("../models/user.js");
const myPassport = require('../configs/passport')

/*router.get('/', (req, res) => {
    res.send("Get: Register")
})*/

router.post('/', myPassport.checkNotAuthenticated, async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        User.create(req.body.nickname, hashedPassword, (err, data) => {});
        res.send("Usuario creado")
      } catch {
        res.send('Error al crear usuario')
    }
})

module.exports = router