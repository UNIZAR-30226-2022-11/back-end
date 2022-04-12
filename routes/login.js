const express = require('express')
const router = express.Router()
//const User = require('../models/user')
const passport = require('passport')
const myPassport = require('../configs/passport')
const User = require('../models/user')

router.post('/', async (req, res) => {
    console.log(req.body)
    const user = await User.getUserByNickname(req.body.nickname)
    res.send(user)
})
// router.post('/', myPassport.checkNotAuthenticated, passport.authenticate('local', {
//     successRedirect: '/',
//     failureRedirect: '/login',
//     failureFlash: true, },async (req,res)=>{
//         console(req.body)
//         const user = await User.getUserByNickname(req.body.nickname)
//         res.send(user)
//     })
    
// )


module.exports = router