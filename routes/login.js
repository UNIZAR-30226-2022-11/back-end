const express = require('express')
const router = express.Router()
const passport = require('passport')
const myPassport = require('../configs/passport')
const User = require('../models/user')

router.post('/', myPassport.checkNotAuthenticated, passport.authenticate('local'), async (req, res) => {
    let respuesta = {}
    res.send(await User.getUserByNickname(req.body.nickname))
})


module.exports = router