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
    //res.send("Post: Register")
    //res.send(req.body)
   // res.json(req.body.nickname)
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        //Guardar usuario
        const user = new User({
          id: 1,
          nickname: req.body.nickname,
          password: hashedPassword,
          puntos: 0
        });
        User.create(user, (err, data) => {});
        res.send("Usuario creado")
      } catch {
        res.send('Error al crear usuario')
    }
})

module.exports = router