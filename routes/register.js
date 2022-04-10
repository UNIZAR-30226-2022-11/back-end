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

        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        
        var exito = await User.create(req.body.nickname, hashedPassword,exito);
        if(exito){
            respuesta ={
                "exito": true,
                "user" : req.body
            }
            res.send(respuesta)
        }
       else{
        respuesta ={
            "exito": false,
            "user" : req.body
        }
        res.send(respuesta)
       }

        
})

module.exports = router