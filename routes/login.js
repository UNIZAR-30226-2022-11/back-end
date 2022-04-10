const express = require('express')
const router = express.Router()
//const User = require('../models/user')
const passport = require('passport')
const myPassport = require('../configs/passport')


/*router.post('/', (req, res) => {
    res.send("Post: login")
})*/
router.post('/', myPassport.checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true,
    send
        })
    
)


module.exports = router