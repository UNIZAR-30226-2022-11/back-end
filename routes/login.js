const express = require('express')
const router = express.Router()
//const User = require('../models/user')
const passport = require('passport')
const myPassport = require('../configs/passport')
const User = require('../models/controller')


/*router.post('/', (req, res) => {
    res.send("Post: login")
})*/
router.post('/', myPassport.checkNotAuthenticated,passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true})
)
router.get("/",User.findOne)
router.get("/", myPassport.checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/:id',
    failureRedirect: '/',
    failureFlash: true})
)
module.exports = router