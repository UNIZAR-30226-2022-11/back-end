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
        var existe=true
        let crear = User.create(req.body.nickname, hashedPassword,existe);
        console.log(existe)
        if(!existe){
            respuesta ={
                "exito": true,
                "user" : req.body
            }
            res.send(res)
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