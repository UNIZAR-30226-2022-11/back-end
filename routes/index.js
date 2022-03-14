const express = require('express')
const router = express.Router()
const myPassport = require('../configs/passport')

router.get('/', myPassport.checkAuthenticated, (req, res) => {
    console.log(req.user.nickname)
    res.send("Get: Home page")
})

router.post('/', (req, res) => {
    res.send("Post: Home page")
})

module.exports = router